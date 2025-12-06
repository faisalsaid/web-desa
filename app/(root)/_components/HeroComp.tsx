'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';
import { useVillageStore } from '@/store/villageStore';
import { Skeleton } from '@/components/ui/skeleton';

export function HeroComp() {
  const village = useVillageStore((state) => state.village);
  const isLoading = !village || !village.villageName; // Cek apakah data penting sudah ada

  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image dengan Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/hero-desa.jpeg" // Ganti dengan foto pemandangan desa resolusi tinggi
          alt="Pemandangan Desa"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay agar teks terbaca */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-background/90" />
      </div>

      {/* Konten */}
      <div className="relative z-10 container px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>Surga Tersembunyi di {village?.regencyName}</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg max-w-4xl mx-auto">
          Membangun Desa, <br className="hidden md:block" />
          <span className="text-emerald-400">Melestarikan Budaya</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Selamat datang di website resmi Desa {village?.villageName}. Pusat
          informasi layanan publik, transparansi anggaran, dan potensi wisata
          lokal.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white h-12 px-8 text-base"
          >
            Jelajahi Potensi
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-black h-12 px-8 text-base transition-all"
          >
            Layanan Warga <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function HeroSkeleton() {
  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Skeleton yang menyerupai Gambar dengan Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder untuk Image Background (Gunakan warna gelap atau Skeleton penuh) */}
        <div className="w-full h-full bg-gray-300 dark:bg-gray-800" />

        {/* Placeholder Overlay Gradient untuk konsistensi visual */}
        {/* Catatan: Untuk skeleton, overlay ini mungkin tidak perlu, tapi kita akan gunakan warna gelap di background skeleton untuk kesan malam/overlay */}
      </div>

      {/* Konten Skeleton */}
      <div className="relative z-10 container px-4 text-center">
        {/* Skeleton Peta/Lokasi */}
        <div className="flex justify-center mb-6 animate-pulse">
          <Skeleton className="h-6 w-52 rounded-full bg-gray-200/50 dark:bg-gray-700/50" />
        </div>

        {/* Skeleton Judul Utama (H1) */}
        <div className="max-w-4xl mx-auto mb-6 space-y-3">
          <Skeleton className="h-10 w-3/4 mx-auto bg-gray-200/70 dark:bg-gray-700/70 md:h-12" />
          <Skeleton className="h-10 w-2/3 mx-auto bg-emerald-400/80 md:h-12" />
        </div>

        {/* Skeleton Paragraf Deskripsi */}
        <div className="max-w-2xl mx-auto mb-8 space-y-2">
          <Skeleton className="h-5 w-full bg-gray-200/50 dark:bg-gray-700/50" />
          <Skeleton className="h-5 w-11/12 mx-auto bg-gray-200/50 dark:bg-gray-700/50" />
          <Skeleton className="h-5 w-4/5 mx-auto bg-gray-200/50 dark:bg-gray-700/50" />
        </div>

        {/* Skeleton Tombol CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Skeleton className="h-12 w-48 bg-emerald-600/70" />
          <Skeleton className="h-12 w-48 bg-gray-200/20" />
        </div>
      </div>
    </section>
  );
}
