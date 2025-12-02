import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'source.unsplash.com',
      'unsplash.com',
      'images.unsplash.com',
      'drive.google.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.ca-east-006.backblazeb2.com',
      },
      {
        protocol: 'https',
        hostname: 'webdesa.s3.ca-east-006.backblazeb2.com',
      },
      {
        protocol: 'https',
        hostname: 'https://s3.ca-east-006.backblazeb2.com/',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  /* config options here */

  allowedDevOrigins: [
    'http://localhost:3000',
    'http://10.11.148.235:3000',
    'http://192.168.137.1:3000',
  ],
};

export default nextConfig;
