'use server';

import { b2Client } from '@/lib/b2client';
import prisma from '@/lib/prisma';
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import crypto from 'crypto';

function generateBucketKey(originalName: string): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');

  const ext = originalName.split('.').pop()?.toLowerCase() ?? 'png';
  const id = crypto.randomUUID();

  return `uploads/${year}/${month}/${id}.${ext}`;
}

// =======================
//  UPLOAD
// =======================

export type UploadResult =
  | { success: true; url: string; id: string }
  | { success: false; error: string };

export async function uploadFileAction(
  formData: FormData,
): Promise<UploadResult> {
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return { success: false, error: 'Invalid file' };
  }

  if (file.size === 0) {
    return { success: false, error: 'Empty file not allowed' };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const bucketKey = generateBucketKey(file.name);

  // upload to B2
  await b2Client.send(
    new PutObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME!,
      Key: bucketKey,
      Body: buffer,
      ContentType: file.type,
    }),
  );

  // public url
  const url = `${process.env.B2_S3_ENDPOINT}/${process.env.B2_BUCKET_NAME}/${bucketKey}`;

  // save metadata in DB
  const asset = await prisma.imageAsset.create({
    data: {
      bucketKey,
      url,
      filename: file.name,
      mimeType: file.type,
      size: file.size,
    },
  });

  return {
    success: true,
    url,
    id: asset.id,
  };
}

// =======================
//  DOWNLOAD
// =======================
export async function downloadFileAction(fileName: string) {
  const res = await b2Client.send(
    new GetObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME!,
      Key: fileName,
    }),
  );

  const stream = await res.Body?.transformToByteArray();

  return stream ?? null;
}

// =======================
//  DELETE
// =======================
export async function deleteFileAction(fileName: string) {
  await b2Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME!,
      Key: fileName,
    }),
  );

  return { success: true };
}

// =======================
//  LIST FILES
// =======================
export async function listFilesAction() {
  const result = await b2Client.send(
    new ListObjectsV2Command({
      Bucket: process.env.B2_BUCKET_NAME!,
    }),
  );

  return result.Contents || [];
}

export async function getImageUrlAction(fileName: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.B2_BUCKET_NAME!,
    Key: fileName,
  });

  const url = await getSignedUrl(b2Client, command, { expiresIn: 3600 });

  return url;
}
