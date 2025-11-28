'use client';

import ImageWrapper from '@/components/ImageWraper';
import { ImageAssetDTO } from '../_lib/types/image-asset.dto';

interface ImageListCompProps {
  assets: ImageAssetDTO[];
}

export default function ImageListComp({ assets }: ImageListCompProps) {
  if (!assets || assets.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Tidak ada asset ditemukan.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
      {assets.map((asset) => (
        <div key={asset.id}>
          <div className="relative w-full h-36  rounded-lg overflow-hidden">
            <ImageWrapper
              src={asset.signedUrl}
              alt={'Asset Image'}
              objectFit="cover"
            />
          </div>
          <div className="p-2">
            <p className="text-xs font-medium break-all">{asset.filename}</p>
            {asset.alt && (
              <p className="text-[10px] text-muted-foreground">{asset.alt}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
