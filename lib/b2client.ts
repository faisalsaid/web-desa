import { S3Client } from '@aws-sdk/client-s3';

if (
  !process.env.B2_S3_ENDPOINT ||
  !process.env.B2_KEY_ID ||
  !process.env.B2_APPLICATION_KEY
) {
  throw new Error('Missing Backblaze B2 environment variables');
}

export const b2Client = new S3Client({
  region: 'us-west-002', // region tetap walaupun bucket region berbeda
  endpoint: process.env.B2_S3_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.B2_KEY_ID!,
    secretAccessKey: process.env.B2_APPLICATION_KEY!,
  },
});
