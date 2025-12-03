'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Eye,
  ArrowRight,
  Newspaper,
  Image as ImageIcon,
} from 'lucide-react';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Shadcn & UI Components
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge'; // Pastikan punya component Badge shadcn

// Dummy Data Generator (Simulasi Database)
const dummyNews = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  title: [
    'Penyaluran Bantuan Langsung Tunai (BLT) Tahap II Berjalan Lancar',
    'Kerja Bakti Masal: Membersihkan Saluran Irigasi Desa',
    'Festival Panen Raya Desa Torino Tahun 2025',
    'Pelatihan Digital Marketing untuk UMKM Desa',
    'Jadwal Posyandu Balita dan Lansia Bulan Agustus',
    'Pembangunan Jalan Usaha Tani Dusun 3 Dimulai',
  ][i],
  category: [
    'Pemerintahan',
    'Sosial',
    'Budaya',
    'Ekonomi',
    'Kesehatan',
    'Pembangunan',
  ][i],
  date: '25 Juli 2025',
  views: 120 + i * 50,
  image: `https://images.unsplash.com/photo-${
    [
      '1611952327309-a739d089f5ad', // crowd/meeting
      '1589802829985-817e51171b92', // nature/village
      '1533900298318-6b8da08a523e', // market/festival
      '1522202176988-66273c2fd55f', // working
      '1576091160399-112ba8d25d1d', // health
      '1504307651254-35680f356dfd', // construction
    ][i]
  }?q=80&w=800&auto=format&fit=crop`,
}));

const NewsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-8 space-y-8">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-border/40 pb-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold tracking-wider mb-2">
              <Newspaper className="w-3 h-3" />
              KABAR DESA
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              Berita Terkini
            </h2>
            <p className="text-muted-foreground max-w-xl text-base">
              Ikuti perkembangan terbaru, agenda kegiatan, dan artikel
              inspiratif dari Desa Torino.
            </p>
          </div>

          {/* Tombol Desktop */}
          <div className="hidden md:block">
            <Button
              variant="ghost"
              asChild
              className="group text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
            >
              <Link href="/berita">
                Lihat Semua Berita
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* --- Swiper Content --- */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={false} // Bisa di-true kan jika ingin tombol panah
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="pb-12 px-1!" // Padding bawah untuk pagination bullets
          >
            {dummyNews.map((news) => (
              <SwiperSlide key={news.id} className="h-auto">
                <NewsCard data={news} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Tombol Mobile */}
        <div className="md:hidden flex justify-center">
          <Button variant="outline" asChild className="w-full">
            <Link href="/berita">Lihat Arsip Berita</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;

// --- Components: News Card ---
interface NewsData {
  title: string;
  date: string;
  views: number;
  image: string;
  category: string;
}

const NewsCard = ({ data }: { data: NewsData }) => {
  return (
    <Link href="#" className="group block h-full">
      <article className="h-full flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:border-green-500/50 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative w-full aspect-video overflow-hidden bg-muted">
          {/* Badge Kategori */}
          <div className="absolute top-3 left-3 z-10">
            <Badge
              variant="secondary"
              className="bg-background/80 backdrop-blur-md text-foreground shadow-sm hover:bg-background"
            >
              {data.category}
            </Badge>
          </div>

          {data.image ? (
            <Image
              src={data.image}
              alt={data.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <ImageIcon size={40} />
            </div>
          )}

          {/* Overlay Gradient (Supaya teks putih terbaca jika ada teks diatas gambar) */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-1 p-5 space-y-4">
          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{data.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>{data.views} Views</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-foreground leading-snug line-clamp-2 group-hover:text-green-600 transition-colors">
            {data.title}
          </h3>

          {/* Spacer to push footer down */}
          <div className="flex-1" />

          {/* Card Footer (Read More) */}
          <div className="flex items-center text-sm font-semibold text-green-600">
            Baca Selengkapnya
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
          </div>
        </div>
      </article>
    </Link>
  );
};
