import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // remotePatterns lebih disarankan daripada domains
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
        // FIX: Hostname tidak boleh pakai 'https://' atau '/' di belakang
        hostname: 's3.ca-east-006.backblazeb2.com',
      },
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
        hostname: 'drive.google.com',
      },
    ],
  },

  // FIX: Masukkan konfigurasi keamanan di sini
  experimental: {
    serverActions: {
      // Masukkan Host (IP:Port) tanpa 'http://'
      allowedOrigins: [
        'localhost:3000',
        '172.28.32.1:3000', // IP Network dari warning log Anda
        '10.11.148.235:3000', // IP lain yang Anda tambahkan
        '192.168.137.1:3000', // IP lain yang Anda tambahkan
      ],
    },
  },
};

export default nextConfig;
