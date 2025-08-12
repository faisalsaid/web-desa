'use client';

import Link from 'next/link';

const GalerySection = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <div className=" text-2xl font-semibold text-amber-600  md:text-5xl">
          Galeri Foto
        </div>
        <p>Menampilkan kegiatan-kegiatan yang berlangsung di Desa</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }, (_, i) => (
          <ImagesCard key={i} />
        ))}
      </div>
      <div className="flex items-center justify-end text-sm">
        <Link className="text-muted-foreground" href={'/'}>
          See All
        </Link>
      </div>
    </div>
  );
};

export default GalerySection;

const ImagesCard = () => {
  return (
    <div className="w-full aspect-video bg-amber-500 rounded-lg flex items-center justify-center">
      Image
    </div>
  );
};
