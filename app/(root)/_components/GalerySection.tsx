'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Camera, X, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// --- Dummy Data ---
// size: menentukan seberapa besar ruang yang diambil di grid
// small: 1 kotak
// tall: 1 lebar x 2 tinggi
// wide: 2 lebar x 1 tinggi
// big: 2 lebar x 2 tinggi
const galleryItems = [
  {
    id: 1,
    // Foto orang berkumpul/musyawarah
    src: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=800',
    category: 'Kegiatan',
    title: 'Musyawarah Desa',
    size: 'tall',
  },
  {
    id: 2,
    // Foto sawah terasering hijau
    src: 'https://images.unsplash.com/photo-1673183762377-cee7beb1f152?q=80&w=800',
    category: 'Alam',
    title: 'Sawah Terasering',
    size: 'wide',
  },
  {
    id: 3,
    // Foto festival/tradisi
    src: 'https://images.unsplash.com/photo-1743918938396-202520b943f4?q=80&w=800',
    category: 'Budaya',
    title: 'Festival Panen',
    size: 'small',
  },
  {
    id: 4,
    // Foto jalan pedesaan aspal/batu
    src: 'https://images.unsplash.com/photo-1748618439948-1fe6d0d4e289?q=80&w=800',
    category: 'Pembangunan',
    title: 'Perbaikan Jalan',
    size: 'tall',
  },
  {
    id: 5,
    // Foto anak-anak/kesehatan
    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
    category: 'Kegiatan',
    title: 'Posyandu Balita',
    size: 'small',
  },
  {
    id: 6,
    // Foto tarian tradisional (Bali/Jawa)
    src: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=800',
    category: 'Budaya',
    title: 'Tari Tradisional',
    size: 'big',
  },
  {
    id: 7,
    // Foto sungai jernih
    src: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=800',
    category: 'Alam',
    title: 'Sungai Bersih',
    size: 'small',
  },
  {
    id: 8,
    // Foto pasar tradisional
    src: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=800',
    category: 'Kegiatan',
    title: 'Pasar Murah',
    size: 'wide',
  },
  {
    id: 9,
    // Foto biji kopi/panen
    src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800',
    category: 'Alam',
    title: 'Panen Kopi',
    size: 'tall',
  },
  {
    id: 10,
    // Foto jembatan kayu/bambu
    src: 'https://images.unsplash.com/photo-1621082691485-f3664d14e333?q=80&w=800',
    category: 'Pembangunan',
    title: 'Jembatan Desa',
    size: 'wide',
  },
  {
    id: 11,
    // Foto lomba lari/kegiatan fisik
    src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800',
    category: 'Kegiatan',
    title: 'Lomba 17an',
    size: 'small',
  },
  {
    id: 12,
    // Foto kerajinan tangan
    src: 'https://images.unsplash.com/photo-1605557626697-2e87166d88f9?q=80&w=800',
    category: 'Ekonomi',
    title: 'Anyaman Bambu',
    size: 'small',
  },
];

const categories = ['Semua', 'Kegiatan', 'Alam', 'Budaya', 'Pembangunan'];

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryItems)[0] | null
  >(null);

  const filteredImages =
    activeCategory === 'Semua'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section className="py-16 bg-muted/20 border-b border-border/40 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 space-y-8">
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 text-xs font-bold tracking-wider">
              <Camera className="w-3 h-3" />
              DOKUMENTASI
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              Galeri <span className="text-pink-600">Desa</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Rekaman lensa kegiatan masyarakat, keindahan alam, dan kemajuan
              pembangunan desa.
            </p>
          </div>
          <div className="hidden md:block">
            <Button
              variant="ghost"
              asChild
              className="group hover:text-pink-600"
            >
              <Link href="/galeri">
                Lihat Album Lengkap{' '}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* --- Filter Tabs --- */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border',
                activeCategory === cat
                  ? 'bg-pink-600 text-white border-pink-600 shadow-md transform scale-105'
                  : 'bg-background text-muted-foreground border-transparent hover:bg-muted hover:text-foreground',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- GRID MASONRY DENGAN ANIMASI SHUFFLE --- */}
        <motion.div
          layout // Properti ajaib untuk animasi shuffle posisi
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[120px] gap-4"
          // 'grid-auto-flow-dense' adalah kunci agar tidak ada lubang kosong (Tetris effect)
          style={{ gridAutoFlow: 'dense' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onClick={() => setSelectedImage(item)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Mobile Button */}
        <div className="flex md:hidden justify-center mt-6">
          <Button variant="outline" asChild className="w-full">
            <Link href="/galeri">Lihat Semua Foto</Link>
          </Button>
        </div>
      </div>

      {/* --- Lightbox Modal --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 rounded-full p-2 z-50">
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl h-[80vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="mt-4 text-center text-white">
                <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                <span className="text-sm text-gray-400">
                  {selectedImage.category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;

// --- Gallery Card (Grid Logic) ---
// eslint-disable-next-line
const GalleryCard = ({ item, onClick }: { item: any; onClick: () => void }) => {
  // Menentukan Span (Ukuran Kotak)
  // row-span = tinggi, col-span = lebar
  let spanClass = 'col-span-1 row-span-1'; // Default (Small)

  if (item.size === 'tall') spanClass = 'col-span-1 row-span-2';
  else if (item.size === 'wide') spanClass = 'col-span-2 row-span-1';
  else if (item.size === 'big') spanClass = 'col-span-2 row-span-2';

  return (
    <motion.div
      layout // Properti ini yang bikin animasi "terbang" ke posisi baru
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: 'spring', damping: 25, stiffness: 120 }} // Animasi membal halus
      className={`relative group rounded-xl overflow-hidden cursor-pointer bg-muted ${spanClass}`}
      onClick={onClick}
    >
      <Image
        src={item.src}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay Hover */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <Maximize2 className="w-8 h-8 mb-2 mx-auto text-pink-400" />
          <p className="font-bold text-sm md:text-base">{item.title}</p>
        </div>
      </div>
    </motion.div>
  );
};
