'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Tag, MapPin, Store, ChevronRight, Share2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock Data untuk simulasi multiple images
const productData = {
  id: '1',
  title: 'Roti Tawar Gandum Premium',
  price: 15000,
  category: 'Sembako',
  rating: 4.8,
  reviewCount: 24,
  description:
    'Roti tawar gandum asli buatan UMKM Desa Maju Jaya. Dibuat tanpa bahan pengawet, tinggi serat, dan sangat cocok untuk sarapan sehat keluarga Anda. Tahan hingga 5 hari di suhu ruang.',
  location: 'Dusun 02, Desa Maju Jaya',
  seller: {
    name: 'Toko Bu Siti',
    image: 'https://github.com/shadcn.png', // Placeholder avatar
    joined: '2 tahun lalu',
  },
  images: [
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1172&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1616645396555-52b865529d2c?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542444459-fbbf73918a38?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1596450524479-7815b3e6c382?q=80&w=1000&auto=format&fit=crop',
  ],
};

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

const ProductDetailPage = () => {
  const [activeImage, setActiveImage] = useState(productData.images[0]);

  // Handler Klik WhatsApp
  const handleContactSeller = () => {
    const message = `Halo ${productData.seller.name}, saya tertarik dengan produk *${productData.title}*. Apakah stok masih tersedia?`;
    const url = `https://wa.me/6281234567890?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-4 md:p-8 space-y-8"
    >
      {/* --- Breadcrumb Simple --- */}
      <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 gap-2">
        <span className="hover:text-emerald-600 cursor-pointer">Beranda</span>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:text-emerald-600 cursor-pointer">Belanja</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-zinc-900 dark:text-zinc-100 font-medium truncate">
          {productData.title}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* --- Left Column: Image Gallery --- */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square md:aspect-4/3 w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <Image
              src={activeImage}
              alt="Main product"
              fill
              className="object-cover transition-all duration-500 hover:scale-105"
              priority
            />
            <Badge className="absolute top-4 left-4 bg-emerald-600 hover:bg-emerald-700">
              Tersedia
            </Badge>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {productData.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`
                  relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 
                  ${
                    activeImage === img
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'border-transparent hover:border-emerald-300'
                  }
                  transition-all
                `}
              >
                <Image
                  src={img}
                  alt={`thumb-${idx}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- Right Column: Product Details --- */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400"
              >
                <Tag className="w-3 h-3 mr-1" /> {productData.category}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-emerald-600"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
              {productData.title}
            </h1>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 font-semibold text-zinc-700 dark:text-zinc-300">
                  {productData.rating}
                </span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-zinc-500">
                {productData.reviewCount} Ulasan
              </span>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center text-zinc-500">
                <MapPin className="w-4 h-4 mr-1" /> {productData.location}
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-xl border border-zinc-100 dark:border-zinc-800 space-y-1">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Harga Satuan
            </span>
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatRupiah(productData.price)}
            </div>
          </div>

          <div className="prose prose-zinc dark:prose-invert max-w-none text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            <p>{productData.description}</p>
          </div>

          {/* Seller Card */}
          <div className="flex items-center gap-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
              <AvatarImage src={productData.seller.image} />
              <AvatarFallback>BS</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                {productData.seller.name}
                <Badge
                  variant="secondary"
                  className="text-[10px] h-5 px-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  Verifikasi Desa
                </Badge>
              </h4>
              <p className="text-xs text-zinc-500 flex items-center gap-1">
                <Store className="w-3 h-3" /> Anggota UMKM Aktif
              </p>
            </div>
          </div>

          <Separator />

          {/* Action Button */}
          <div className="pt-2">
            <Button
              size="lg"
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-lg font-semibold h-14 shadow-lg shadow-green-500/20 transition-transform active:scale-[0.98]"
              onClick={handleContactSeller}
            >
              <FaWhatsapp className="w-6 h-6 mr-2" />
              Hubungi Penjual
            </Button>
            <p className="text-xs text-center text-zinc-400 mt-3">
              Transaksi dilakukan langsung dengan penjual melalui WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* --- Reviews Section --- */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          Ulasan Pembeli{' '}
          <span className="text-zinc-400 font-normal text-base">
            ({productData.reviewCount})
          </span>
        </h3>

        {/* Empty State Style */}
        <Card className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center text-zinc-500">
            <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-full mb-3">
              <Star className="w-8 h-8 text-zinc-300" />
            </div>
            <p className="font-medium">Belum ada ulasan tertulis.</p>
            <p className="text-sm">
              Jadilah yang pertama memberikan ulasan untuk produk ini!
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;
