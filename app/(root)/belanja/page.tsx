'use client';

import { motion } from 'framer-motion';
import { Star, ShoppingCart, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// --- Data Dummy (Sedikit diperkaya untuk demo) ---
const dummyProducts = [
  {
    id: '1',
    title: 'Roti Tawar Gandum Premium',
    price: 10000,
    tag: 'Sembako',
    rating: 4.5,
    sold: 20,
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1172&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Souvenir Anyaman Bambu',
    price: 150000,
    tag: 'Kerajinan',
    rating: 5.0,
    sold: 5,
    image:
      'https://images.unsplash.com/photo-1563391507496-209fc783d42e?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Kain Tenun Ikat Tradisional',
    price: 300000,
    tag: 'Fashion',
    rating: 4.8,
    sold: 12,
    image:
      'https://images.unsplash.com/photo-1762764214015-d5c22646465b?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Kopi Robusta Desa (250g)',
    price: 45000,
    tag: 'Kuliner',
    rating: 4.7,
    sold: 50,
    image:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop',
  },
];

// --- Helper Format Rupiah ---
const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

// --- Animations Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Efek muncul berurutan
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const BelanjaPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10 text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <Badge
            variant="outline"
            className="border-emerald-500 text-emerald-600 dark:text-emerald-400 px-4 py-1 mb-2"
          >
            Produk Lokal Unggulan
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 dark:text-emerald-400 tracking-tight">
            Beli Dari Desa
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Dukung perekonomian warga dengan membeli produk asli UMKM desa.
            Kualitas terbaik, langsung dari pengrajin dan petani lokal.
          </p>
        </motion.div>
      </div>

      {/* Grid Products */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {dummyProducts.map((product) => (
          <motion.div key={product.id} variants={itemVariants}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BelanjaPage;

// --- Components ---

type ProductType = {
  id: string;
  title: string;
  price: number;
  tag: string;
  rating: number;
  image: string;
  sold: number;
};

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/belanja/${product.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-900/10 transition-all duration-300 rounded-xl flex flex-col">
        {/* Image Section */}
        <CardHeader className="p-0 relative overflow-hidden aspect-4/3">
          <Image
            alt={product.title}
            src={product.image}
            fill
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          {/* Overlay Tag */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/90 text-emerald-700 hover:bg-white dark:bg-zinc-950/80 dark:text-emerald-400 backdrop-blur-sm shadow-sm">
              <Tag className="w-3 h-3 mr-1" /> {product.tag}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4 grow space-y-3">
          {/* Title */}
          <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {product.title}
          </h3>

          {/* Rating & Sold Info */}
          <div className="flex items-center text-sm gap-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-zinc-600 dark:text-zinc-400 font-medium">
                {product.rating}
              </span>
            </div>
            <Separator orientation="vertical" className="h-3" />
            <span className="text-zinc-500 text-xs">
              {product.sold} Terjual
            </span>
          </div>
        </CardContent>

        {/* Price & Action */}
        <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Harga
            </span>
            <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
              {formatRupiah(product.price)}
            </span>
          </div>

          <Button
            size="icon"
            className="rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
