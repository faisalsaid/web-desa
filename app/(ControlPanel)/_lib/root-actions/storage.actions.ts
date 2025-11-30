'use server';

import { b2Client } from '@/lib/b2client';
import { PutObjectCommand } from '@aws-sdk/client-s3';

import sharp from 'sharp';

/**
 * Opsi upload file ke B2
 */
export interface UploadOptions {
  folderPrefix: string; // e.g. 'organizations/123'
  fileName?: string; // default 'file.jpg'
  resize?: number; // max width/height, square
  convertJpg?: boolean; // convert ke JPG jika true
  quality?: number; // JPG quality (default 85)
}

/**
 * Fungsi upload file ke Backblaze B2 S3
 * @param file File dari frontend
 * @param options UploadOptions
 * @returns URL publik file (ubah sesuai bucket public/private)
 */
export async function uploadFileToB2(
  file: File,
  options: UploadOptions,
): Promise<string> {
  const {
    folderPrefix,
    fileName = 'file.jpg',
    resize = 500,
    convertJpg = true,
    quality = 85,
  } = options;

  // 1️⃣ Convert file ke buffer dengan tipe aman
  const arrayBuffer: ArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(new Uint8Array(arrayBuffer));

  // 2️⃣ Resize & convert JPG jika diperlukan
  let finalBuffer: Buffer = buffer;
  let finalExt = fileName.split('.').pop()?.toLowerCase() ?? 'jpg';

  if (convertJpg) {
    finalBuffer = await sharp(buffer)
      .resize(resize, resize, { fit: 'cover' }) // crop center jika tidak square
      .jpeg({ quality })
      .toBuffer();
    finalExt = 'jpg';
  }

  // 3️⃣ Tentukan key S3 deterministik
  const key = `${folderPrefix}/${fileName.split('.')[0]}.${finalExt}`;

  // 4️⃣ Upload ke B2
  await b2Client.send(
    new PutObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME!,
      Key: key,
      Body: finalBuffer,
      ContentType: `image/${finalExt}`,
    }),
  );

  // 5️⃣ Return URL publik (ubah sesuai bucket public/private)
  const url = `https://s3.ca-east-006.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${key}`;
  return url;
}
