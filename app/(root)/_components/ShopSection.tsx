'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Store,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ImageIcon,
} from 'lucide-react';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

// Shadcn UI
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Dummy Data Generator
const products = [
  {
    id: 1,
    name: 'Kripik Pisang Lumer',
    seller: 'UMKM Bu Susi',
    price: 15000,
    rating: 4.8,
    sold: 230,
    image:
      'https://images.unsplash.com/photo-1599639668312-38b1f584e2a6?q=80&w=800&auto=format&fit=crop',
    isPromo: true,
  },
  {
    id: 2,
    name: 'Kain Tenun Motif Desa',
    seller: 'Tenun Berkah',
    price: 250000,
    rating: 5.0,
    sold: 45,
    image:
      'https://images.unsplash.com/photo-1542062700-9b61ccbc1696?q=80&w=800&auto=format&fit=crop',
    isPromo: false,
  },
  {
    id: 3,
    name: 'Madu Hutan Murni 500ml',
    seller: 'Kelompok Tani Lebah',
    price: 85000,
    rating: 4.9,
    sold: 120,
    image:
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop',
    isPromo: false,
  },
  {
    id: 4,
    name: 'Tas Anyaman Bambu',
    seller: 'Desa Kreatif',
    price: 45000,
    rating: 4.7,
    sold: 80,
    image:
      'https://images.unsplash.com/photo-1590874102752-ce22d84d588c?q=80&w=800&auto=format&fit=crop',
    isPromo: true,
  },
  {
    id: 5,
    name: 'Kopi Robusta Bubuk',
    seller: 'Kopi Tani',
    price: 35000,
    rating: 4.6,
    sold: 300,
    image:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
    isPromo: false,
  },
  {
    id: 6,
    name: 'Gula Aren Asli',
    seller: 'Gula Semut Mandiri',
    price: 20000,
    rating: 4.8,
    sold: 150,
    image:
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop',
    isPromo: false,
  },
];

const ShopSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="py-16 bg-muted/20 border-b border-border/40">
      <div className="container mx-auto px-4 md:px-8 space-y-8">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 text-xs font-bold tracking-wider">
              <ShoppingBag className="w-3 h-3" />
              PRODUK LOKAL
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              Beli Dari <span className="text-teal-600">Desa</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Dukung perekonomian warga dengan membeli produk asli UMKM.
              Kualitas terbaik langsung dari tangan pengrajin.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-10 h-10 hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-900/20"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-10 h-10 hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-900/20"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight className="w-5 h-5" />
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
            slidesPerView={1.5} // Mobile friendly peek
            loop={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
              1280: { slidesPerView: 5, spaceBetween: 24 },
            }}
            className="pb-8! px-2!"
          >
            {products.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <ShopCard product={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Footer Link Mobile */}
        <div className="flex md:hidden justify-center">
          <Button
            variant="outline"
            asChild
            className="w-full text-teal-600 border-teal-200"
          >
            <Link href="/produk">Lihat Semua Produk</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;

// --- Components: Shop Card ---
interface ProductData {
  id: number;
  name: string;
  seller: string;
  price: number;
  rating: number;
  sold: number;
  image: string;
  isPromo: boolean;
}

const ShopCard = ({ product }: { product: ProductData }) => {
  // Helper Format Rupiah
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <Link href="#" className="group block h-full">
      <div className="flex flex-col h-full rounded-2xl bg-card border border-border shadow-sm transition-all duration-300 hover:shadow-lg hover:border-teal-400/50 hover:-translate-y-1">
        {/* 1. Image Area (Square Ratio) */}
        <div className="relative aspect-square w-full overflow-hidden rounded-t-2xl bg-muted">
          {product.isPromo && (
            <Badge className="absolute top-3 left-3 z-10 bg-red-500 hover:bg-red-600 text-white border-0 shadow-md">
              Promo
            </Badge>
          )}

          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImageIcon className="h-10 w-10 text-muted-foreground" />
            </div>
          )}

          {/* Overlay Button (Muncul saat hover di Desktop) */}
          <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 px-4">
            <Button className="w-full bg-white/90 text-teal-700 hover:bg-white shadow-lg backdrop-blur-sm">
              <MessageCircle className="w-4 h-4 mr-2" /> Chat Penjual
            </Button>
          </div>
        </div>

        {/* 2. Product Details */}
        <div className="flex flex-col flex-1 p-4">
          {/* Seller Name */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
            <Store className="w-3 h-3" />
            <span className="line-clamp-1">{product.seller}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-foreground leading-snug line-clamp-2 mb-2 group-hover:text-teal-600 transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-auto pt-2">
            <p className="text-lg font-bold text-teal-600">
              {formatRupiah(product.price)}
            </p>

            {/* Rating & Sold */}
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <div className="flex items-center text-yellow-500">
                <Star className="w-3 h-3 fill-current" />
                <span className="ml-1 text-foreground font-medium">
                  {product.rating}
                </span>
              </div>
              <span>•</span>
              <span>Terjual {product.sold}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
