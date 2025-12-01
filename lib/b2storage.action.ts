// lib/storage.ts
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { b2Client } from './b2client';

const BUCKET_NAME = process.env.B2_BUCKET_NAME!;

// --- 1. FUNCTION UPLOAD (Return Key, bukan URL) ---
interface UploadOptions {
  file: File;
  folder: string;
  customFileName?: string;
}

export async function b2UploadImage({
  file,
  folder,
  customFileName,
}: UploadOptions): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  // Sanitasi nama file
  const fileName = customFileName
    ? customFileName
    : `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

  const cleanFolder = folder.replace(/^\/+|\/+$/g, '');
  const key = `${cleanFolder}/${fileName}`; // Ini yang akan kita simpan di DB

  try {
    await b2Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        // HAPUS ACL 'public-read' KARENA BUCKET PRIVATE
      }),
    );

    // Return KEY saja (path relatif), bukan Full URL
    return key;
  } catch (error) {
    console.error('Error uploading:', error);
    throw new Error('Failed to upload image');
  }
}

// --- 2. FUNCTION GET URL (Generate Presigned URL) ---
// Gunakan ini saat mengambil data dari DB untuk ditampilkan di Frontend
export async function getImageUrl(key: string | null): Promise<string | null> {
  if (!key) return null;

  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    // Generate URL yang valid selama 1 jam (3600 detik)
    const url = await getSignedUrl(b2Client, command, { expiresIn: 3600 });
    return url;
  } catch (error) {
    console.error('Error generating signed url:', error);
    return null;
  }
}

// --- 3. FUNCTION DELETE ---
export async function deleteImage(key: string) {
  try {
    await b2Client.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key, // Kita sekarang menghapus berdasarkan Key langsung
      }),
    );
  } catch (error) {
    console.error('Error deleting:', error);
  }
}
