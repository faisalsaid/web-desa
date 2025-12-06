import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },

      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },

      {
        protocol: 'https',
        hostname: 's3.ca-east-006.backblazeb2.com',
      },
      {
        protocol: 'https',
        hostname: 'webdesa.s3.ca-east-006.backblazeb2.com',
      },
    ],
  },

  allowedDevOrigins: [
    'http://localhost:3000',
    'http://10.11.148.235:3000',
    'http://192.168.137.1:3000',
  ],
};

export default nextConfig;
