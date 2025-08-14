import { Eye, User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const BeritaPage = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-4">
        <h1 className="text-amber-800 font-semibold text-2xl text-center">
          Berita Dari Desa
        </h1>
        <p className="text-center">
          Menyajikan informasi terbaru tentang peristiwa, berita terkini dan
          artikel-artikel jurnalistik dari Desa Torino.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 12 }, (_, i) => (
          <NewsCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default BeritaPage;

const NewsCard = () => {
  const souce =
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return (
    <div className="bg-muted rounded-xl overflow-hidden ">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <Image alt="product" src={souce} fill className="object-cover" />
      </div>
      <div className="space-y-4">
        <div className="p-4 space-y-2">
          <h1 className="line-clamp-2 text-xl">Title Berita Desa</h1>
          <p className="line-clamp-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            non ipsa voluptatibus, animi, cumque nam error debitis ipsam maxime
            magnam laudantium consectetur doloribus dolorem sit dolor tempora
            distinctio? Saepe illo eum, fugiat ullam porro reprehenderit,
            perferendis ratione iusto, debitis temporibus minima. Repellendus
            maiores tempora iusto.
          </p>
        </div>
        <div className="flex items-stretch justify-between">
          <div className="text-sm p-4 text-muted-foreground space-y-2">
            <div className="flex items-center gap-1">
              <User size={16} /> <span>Admisitrator</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={16} /> <span>Dilihat 345 kali</span>
            </div>
          </div>
          <div className="bg-amber-800 p-4 text-white rounded-tl-2xl text-center font-bold -space-y-1">
            <div>8 Aug</div>
            <div>2025</div>
          </div>
        </div>
      </div>
    </div>
  );
};
