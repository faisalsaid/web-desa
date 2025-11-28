'use server';

import { b2Client } from '@/lib/b2client';
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// =======================
//  UPLOAD
// =======================

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function uploadFileAction(
  formData: FormData,
): Promise<UploadResult> {
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return { success: false, error: 'Invalid file' };
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  await b2Client.send(
    new PutObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME!,
      Key: file.name,
      Body: buffer,
      ContentType: file.type,
    }),
  );

  return {
    success: true,
    url: `${process.env.B2_S3_ENDPOINT}/${process.env.B2_BUCKET_NAME}/${file.name}`,
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
