'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, User, ArrowRight, Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

// --- Dummy Data ---
const dummyNews = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  title:
    i === 0
      ? 'Musyawarah Perencanaan Pembangunan Desa Tahun Anggaran 2025 Berjalan Lancar'
      : 'Penyaluran Bantuan Langsung Tunai (BLT) Tahap 3',
  category: i % 2 === 0 ? 'Pemerintahan' : 'Kegiatan Warga',
  excerpt:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  date: { day: '08', month: 'Agustus', year: '2025' },
  author: 'Admin Desa',
  views: 120 + i * 10,
  image: `https://images.unsplash.com/photo-${
    i % 2 === 0 ? '1494783367193-149034c05e8f' : '1593113598332-cd288d649433'
  }?q=80&w=800&auto=format&fit=crop`,
}));

// --- Animasi ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BeritaPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 md:p-8 space-y-10">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-emerald-800 dark:text-emerald-500 tracking-tight">
            Kabar Desa
          </h1>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-lg">
            Informasi terkini, transparan, dan terpercaya seputar kegiatan dan
            perkembangan di Desa Torino.
          </p>
        </motion.div>

        {/* Search Bar (Opsional UI) */}
        <div className="relative max-w-md mx-auto mt-6">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Cari berita..."
            className="pl-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-emerald-500"
          />
        </div>
      </div>

      {/* Grid Berita */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
      >
        {dummyNews.map((news) => (
          <motion.div key={news.id} variants={itemVariants}>
            <NewsCard news={news} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination / Load More */}
      <div className="flex justify-center pt-6">
        <Button
          variant="outline"
          className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
        >
          Muat Lebih Banyak
        </Button>
      </div>
    </div>
  );
};

export default BeritaPage;

// --- Komponen Kartu Berita ---

interface NewsCardProps {
  news: (typeof dummyNews)[0];
}

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <Link href={`/berita/${news.id}`} className="group h-full block">
      <Card className="h-full overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-900/10 transition-all duration-300 flex flex-col rounded-xl">
        {/* Bagian Gambar */}
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            alt={news.title}
            src={news.image}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay Gradient (Supaya tulisan putih terbaca jika ada) */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badge Tanggal (Floating) */}
          <div className="absolute top-3 right-3 bg-white/95 dark:bg-zinc-950/90 backdrop-blur-sm p-2 rounded-lg text-center shadow-sm min-w-[60px]">
            <span className="block text-xl font-bold text-emerald-600 dark:text-emerald-400 leading-none">
              {news.date.day}
            </span>
            <span className="block text-[10px] font-medium text-zinc-500 uppercase tracking-wide">
              {news.date.month}
            </span>
          </div>

          {/* Badge Kategori */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md border-0">
              {news.category}
            </Badge>
          </div>
        </div>

        {/* Bagian Konten */}
        <CardContent className="p-5 grow space-y-3">
          <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 gap-3 mb-2">
            <div className="flex items-center gap-1">
              <User size={14} className="text-emerald-500" />
              <span>{news.author}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div className="flex items-center gap-1">
              <Eye size={14} className="text-emerald-500" />
              <span>{news.views} dilihat</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 leading-snug line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {news.title}
          </h3>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
            {news.excerpt}
          </p>
        </CardContent>

        {/* Footer Card */}
        <CardFooter className="p-5 mt-auto flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/50 pt-4">
          <span className="text-xs text-zinc-400 font-medium">
            {news.date.year}
          </span>
          <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:gap-2 transition-all">
            Baca Selengkapnya <ArrowRight size={16} />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
