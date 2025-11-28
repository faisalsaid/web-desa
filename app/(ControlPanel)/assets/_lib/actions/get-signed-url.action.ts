'use server';

import { b2Client } from '@/lib/b2client';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ImageAssetRepository } from '../repository/image-asset.repository';

export async function getSignedUrlAction(id: string) {
  const repo = new ImageAssetRepository();
  const asset = await repo.findById(id);

  if (!asset) {
    throw new Error('Asset not found');
  }

  const command = new GetObjectCommand({
    Bucket: process.env.B2_BUCKET_NAME!,
    Key: asset.bucketKey,
  });

  // Generate signed URL (1 hour)
  const signedUrl = await getSignedUrl(b2Client, command, {
    expiresIn: 3600,
  });

  return {
    id: asset.id,
    url: signedUrl,
    filename: asset.filename,
    alt: asset.alt,
  };
}
