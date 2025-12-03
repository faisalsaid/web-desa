'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { FaBuildingColumns, FaChartBar } from 'react-icons/fa6';
import { IconType } from 'react-icons';
import { LuNewspaper, LuPackageCheck } from 'react-icons/lu';
import { TbSpeakerphone } from 'react-icons/tb';
import { BsBagCheck } from 'react-icons/bs';
import { PiImages } from 'react-icons/pi';
import { RiListIndefinite } from 'react-icons/ri';

// --- KONFIGURASI MENU ---
const menu = [
  {
    title: 'Profil Desa',
    icon: FaBuildingColumns,
    color: 'from-emerald-500 to-green-600',
    link: '/profil',
  },
  {
    title: 'Info Grafis',
    icon: FaChartBar,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    title: 'IDM',
    icon: RiListIndefinite,
    color: 'from-orange-500 to-amber-600',
  },
  { title: 'PPID', icon: LuNewspaper, color: 'from-purple-500 to-violet-600' },
  { title: 'Berita', icon: TbSpeakerphone, color: 'from-red-500 to-pink-600' },
  {
    title: 'Pasar Desa',
    icon: BsBagCheck,
    color: 'from-teal-500 to-emerald-600',
  },
  {
    title: 'Bansos',
    icon: LuPackageCheck,
    color: 'from-indigo-500 to-blue-600',
  },
  { title: 'Galeri', icon: PiImages, color: 'from-rose-500 to-orange-600' },
];

// --- VARIAN ANIMASI ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50 },
  },
};

const FeatureSection = () => {
  return (
    // Menggunakan bg-muted/30 agar sedikit berbeda dari bg-background utama, tapi tetap harmonis di Dark Mode
    <section className="py-16 px-4 md:px-8 bg-muted/30 border-y border-border/40">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
            Akses Cepat
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jelajahi layanan publik dan informasi transparansi Desa Sukamaju
            dengan mudah.
          </p>
        </div>

        {/* Grid Container */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {menu.map((item, index) => (
            <FeatureCard
              key={index}
              title={item.title}
              icon={item.icon}
              color={item.color}
              href={item.link || '#'}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;

// --- KOMPONEN KARTU (CARD) ---
interface FeatureCardProps {
  title: string;
  icon: IconType;
  color?: string;
  href: string;
}

const FeatureCard = ({ title, icon, color, href }: FeatureCardProps) => {
  const Icon = icon;
  const gradientClass = color || 'from-primary to-primary/60';

  return (
    <motion.div variants={itemVariants} className="h-full">
      <Link href={href} className="group block h-full">
        {/* 
          CARD STYLING:
          1. bg-card: Otomatis putih di Light Mode, Abu gelap di Dark Mode.
          2. border-border: Garis halus pemisah (penting untuk Dark Mode).
          3. text-card-foreground: Warna teks otomatis menyesuaikan.
        */}
        <div className="relative overflow-hidden flex flex-col items-center justify-center p-6 rounded-xl bg-card border border-border/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/50 hover:-translate-y-1 h-full">
          {/* Background Gradient Blur (Hiasan Halus) */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Icon Container */}
          <div
            className={`relative mb-4 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-linear-to-br ${gradientClass} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
          >
            {/* Glow Effect Inner */}
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

            <Icon className="w-6 h-6 md:w-8 md:h-8 drop-shadow-md" />
          </div>

          {/* Text Content */}
          <div className="text-center relative z-10">
            <h3 className="text-sm md:text-base font-semibold text-card-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>

          {/* Dekorasi Pojok (Optional, memberi kesan techy) */}
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>
    </motion.div>
  );
};
