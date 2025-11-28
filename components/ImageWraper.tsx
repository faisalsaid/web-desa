'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

/**
 * ImageWrapper
 * ---------------------------
 * Reusable Client Component untuk menampilkan gambar dengan:
 * - Skeleton placeholder saat loading
 * - Fade-in transition saat gambar muncul
 * - Mendukung object-fit, width & height custom
 * - Cocok untuk public URL atau presigned URL (private bucket)
 *
 * Props:
 * @prop {string} src - URL gambar (required)
 * @prop {string} [alt='image'] - Alt text untuk SEO & aksesibilitas
 * @prop {number|string} [width='100%'] - Lebar container gambar
 * @prop {number|string} [height='100%'] - Tinggi container gambar
 * @prop {string} [className=''] - Tambahan className Tailwind/CSS
 * @prop {'cover'|'contain'|'fill'|'none'|'scale-down'} [objectFit='cover'] - CSS object-fit
 */
interface ImageWrapperProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const ImageWrapper: React.FC<ImageWrapperProps> = ({
  src,
  alt = 'image',
  width = '100%',
  height = '100%',
  className = '',
  objectFit = 'cover',
}) => {
  const [loading, setLoading] = useState(true);

  // Reset loading state setiap src berubah
  useEffect(() => {
    setLoading(true);
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Skeleton placeholder saat gambar sedang load */}
      {loading && <Skeleton width="100%" height="100%" />}

      {src && (
        <Image
          alt={alt}
          src={src}
          fill
          // Transisi fade-in saat gambar selesai load
          className={`transition-opacity duration-500 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ objectFit }}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
          // Disable Next.js optimization untuk URL presigned/private
          unoptimized
        />
      )}
    </div>
  );
};

export default ImageWrapper;

/**
 * Skeleton Component
 * ---------------------------
 * Placeholder loading untuk ImageWrapper
 *
 * Props:
 * @prop {string|number} [width='100%'] - Lebar skeleton
 * @prop {string|number} [height='100%'] - Tinggi skeleton
 * @prop {string} [className=''] - Tambahan className
 */
interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '100%',
  className = '',
}) => (
  <div
    className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${className}`}
    style={{ width, height }}
  />
);
