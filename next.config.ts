import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com', 'unsplash.com'],
  },
  /* config options here */

  allowedDevOrigins: [
    'http://localhost:3000',
    'http://10.11.148.235:3000',
    'http://192.168.137.1:3000',
  ],
};

export default nextConfig;
