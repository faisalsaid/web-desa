'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Star,
  ArrowRight,
  Compass,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from 'lucide-react';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper'; // Type definition
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Shadcn UI
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Dummy Data Generator
const destinations = [
  {
    id: 1,
    title: 'Danau Biru Torino',
    location: 'Dusun Utara',
    rating: 4.8,
    reviews: 120,
    price: 'Rp 15.000',
    image:
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Bukit Pandang Asri',
    location: 'Dusun Selatan',
    rating: 4.9,
    reviews: 85,
    price: 'Gratis',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Curug Kembar',
    location: 'Lembah Harapan',
    rating: 4.7,
    reviews: 230,
    price: 'Rp 20.000',
    image:
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Pasar Seni Desa',
    location: 'Alun-Alun',
    rating: 4.5,
    reviews: 50,
    price: 'Gratis',
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Agrowisata Petik Buah',
    location: 'Perkebunan',
    rating: 4.6,
    reviews: 90,
    price: 'Rp 30.000',
    image:
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Homestay Tradisional',
    location: 'Desa Wisata',
    rating: 4.9,
    reviews: 45,
    price: 'Rp 200rb/mlm',
    image:
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=1000&auto=format&fit=crop',
  },
];

const TourSection = () => {
  // Ref untuk Custom Navigation Button
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="py-16 bg-background relative border-b border-border/40">
      {/* Background Decor (Optional) */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-green-500/5 blur-3xl rounded-full -z-10" />

      <div className="container mx-auto px-4 md:px-8 space-y-8">
        {/* --- Header Section with Navigation --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs font-bold tracking-wider">
              <Compass className="w-3 h-3" />
              DESTINASI WISATA
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              Jelajahi Keindahan <span className="text-green-600">Torino</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Temukan spot terbaik untuk liburan, relaksasi, dan petualangan
              seru yang hanya ada di desa kami.
            </p>
          </div>

          {/* Custom Navigation Buttons (Desktop) */}
          <div className="hidden md:flex gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-2 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-2 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* --- Swiper Carousel --- */}
        <div className="">
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2} // 1.2 agar user di HP tau bisa digeser
            centeredSlides={false}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="pb-10! px-2!"
          >
            {destinations.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <TourCard data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Footer Link Mobile */}
        <div className="flex md:hidden justify-center">
          <Button variant="ghost" asChild className="w-full text-green-600">
            <Link href="/pariwisata">
              Lihat Semua Destinasi <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TourSection;

// --- Components: Tour Card ---
interface TourData {
  title: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
}

const TourCard = ({ data }: { data: TourData }) => {
  return (
    <Link href="#" className="group block h-full">
      {/* Card Container - Aspect Ratio 4:5 (Portrait Poster Style) */}
      <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-muted shadow-md transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
        {/* Image */}
        {data.image ? (
          <Image
            src={data.image}
            alt={data.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <ImageIcon className="h-12 w-12 text-gray-400" />
          </div>
        )}

        {/* Top Badge: Rating & Price */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
          <Badge
            variant="secondary"
            className="bg-white/90 text-black backdrop-blur-md border-0 shadow-sm gap-1 pl-2 pr-3 py-1.5 rounded-full"
          >
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-xs">{data.rating}</span>
            <span className="text-[10px] text-gray-500 font-normal">
              ({data.reviews})
            </span>
          </Badge>

          <Badge className="bg-black/60 text-white backdrop-blur-sm border-0 hover:bg-black/70">
            {data.price}
          </Badge>
        </div>

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80 z-10" />

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center text-gray-300 text-xs mb-1 gap-1">
                <MapPin className="w-3 h-3" />
                {data.location}
              </div>
              <h3 className="text-xl font-bold text-white leading-tight mb-2">
                {data.title}
              </h3>
            </div>

            {/* Button Bulat yang muncul saat hover */}
            <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-white opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-lg">
              <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
