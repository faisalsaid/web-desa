'use client';

import Image from 'next/image';
import Link from 'next/link';

const GalerySection = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <div className=" text-2xl font-semibold text-green-600  md:text-5xl">
          Galeri Foto
        </div>
        <p>Menampilkan kegiatan-kegiatan yang berlangsung di Desa</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }, (_, i) => (
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
  const source =
    'https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return (
    <div className="w-full aspect-video bg-amber-500 rounded-lg flex items-center justify-center relative overflow-hidden">
      <Image
        src={source}
        alt="Portrait"
        // width={300}
        // height={700}
        className="object-cover w-full h-full"
        fill
      />
    </div>
  );
};
