'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  MapPin,
  Mountain,
  Sprout,
  ShoppingBag,
  Utensils,
  ImageIcon,
} from 'lucide-react';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow'; // Opsional: Efek 3D

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Dummy Data Generator
const dummyPotency = [
  {
    id: 1,
    title: 'Air Terjun Bidadari',
    category: 'Wisata Alam',
    description:
      'Destinasi wisata unggulan dengan air jernih dan pemandangan asri.',
    image:
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1000&auto=format&fit=crop',
    icon: Mountain,
  },
  {
    id: 2,
    title: 'Kopi Arabika Torino',
    category: 'Perkebunan',
    description:
      'Komoditas kopi kualitas ekspor yang ditanam di dataran tinggi desa.',
    image:
      'https://images.unsplash.com/photo-1653302800594-7e40cf0767fc?q=80&w=1000&auto=format&fit=crop',
    icon: Sprout,
  },
  {
    id: 3,
    title: 'Kerajinan Bambu',
    category: 'Ekonomi Kreatif',
    description:
      'Produk anyaman bambu buatan tangan pengrajin lokal yang mendunia.',
    image:
      'https://images.unsplash.com/photo-1719041160596-bc62775793b9?q=80&w=1000&auto=format&fit=crop',
    icon: ShoppingBag,
  },
  {
    id: 4,
    title: 'Kampung Adat',
    category: 'Budaya',
    description:
      'Melestarikan rumah adat dan tradisi leluhur yang masih terjaga.',
    image:
      'https://images.unsplash.com/photo-1764681860091-3a7fdba3f915?q=80&w=1000&auto=format&fit=crop',
    icon: MapPin,
  },
  {
    id: 5,
    title: 'Sawah Terasering',
    category: 'Agrowisata',
    description:
      'Hamparan sawah hijau yang memanjakan mata, spot foto favorit.',
    image:
      'https://images.unsplash.com/photo-1673183762170-87a94100f466?q=80&w=1000&auto=format&fit=crop',
    icon: Mountain,
  },
  {
    id: 6,
    title: 'Kuliner Nasi Liwet',
    category: 'Kuliner',
    description: 'Cita rasa masakan khas desa dengan rempah pilihan.',
    image:
      'https://images.unsplash.com/photo-1707999251954-2a4abc6e1f35?q=80&w=1000&auto=format&fit=crop',
    icon: Utensils,
  },
];

const PotentialSection = () => {
  return (
    <section className="py-16 bg-muted/30 dark:bg-background border-b border-border/40">
      <div className="container mx-auto px-4 md:px-8 space-y-10">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold tracking-wider mb-2">
              <Sprout className="w-3 h-3" />
              KEKAYAAN LOKAL
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              Potensi Desa <span className="text-emerald-600">Torino</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Menggali keindahan alam, hasil bumi melimpah, dan kearifan lokal
              yang menjadi identitas serta penggerak ekonomi warga.
            </p>
          </div>

          <div className="hidden md:block">
            <Button
              variant="outline"
              asChild
              className="group border-emerald-200 hover:border-emerald-500 hover:text-emerald-600"
            >
              <Link href="/potensi">
                Jelajahi Semua Potensi
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* --- Swiper Content --- */}
        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="pb-12 px-2!" // Extra padding bawah untuk bullets
          >
            {dummyPotency.map((item) => (
              <SwiperSlide key={item.id} className="h-full">
                <PotentialCard data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Mobile Button */}
        <div className="flex md:hidden justify-center">
          <Button variant="outline" asChild className="w-full">
            <Link href="/potensi">Lihat Semua Potensi</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PotentialSection;

// --- Card Component ---
interface PotencyData {
  title: string;
  category: string;
  description: string;
  image: string;
  // eslint-disable-next-line
  icon: any;
}

const PotentialCard = ({ data }: { data: PotencyData }) => {
  const Icon = data.icon;

  return (
    <div className="group relative h-[400px] w-full overflow-hidden rounded-2xl bg-muted shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* 1. Background Image */}
      {data.image ? (
        <Image
          src={data.image}
          alt={data.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-emerald-900/10">
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
        </div>
      )}

      {/* 2. Gradient Overlay (Always Visible for Contrast) */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

      {/* 3. Floating Category Badge (Top Left) */}
      <div className="absolute top-4 left-4 z-10">
        <Badge className="bg-white/90 text-emerald-800 hover:bg-white backdrop-blur-md shadow-sm border-0">
          <Icon className="mr-1 h-3 w-3" />
          {data.category}
        </Badge>
      </div>

      {/* 4. Content Content (Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
          {data.title}
        </h3>

        {/* Description (Hanya muncul/naik saat hover di desktop, atau selalu ada tapi pendek) */}
        <p className="text-gray-300 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 md:opacity-0 md:group-hover:opacity-100 block">
          {data.description}
        </p>

        {/* Action Link */}
        <div className="flex items-center text-emerald-300 text-sm font-medium opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
          Lihat Detail <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </div>
    </div>
  );
};
