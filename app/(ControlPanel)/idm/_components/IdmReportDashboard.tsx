'use client';

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Users,
  Leaf,
  Coins, // Pengganti DollarSign agar lebih universal
  Target,
  Award,
  Download,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { useVillageStore } from '@/store/villageStore';

// --- Types Definition (NO ANY) ---

type IdmStatus =
  | 'MANDIRI'
  | 'MAJU'
  | 'BERKEMBANG'
  | 'TERTINGGAL'
  | 'SANGAT TERTINGGAL';

interface DimensionData {
  label: string;
  score: number; // 0.0 - 1.0
  description: string;
  indicators_passed: number;
  total_indicators: number;
}

interface IdmData {
  year: number;
  villageName: string;
  districtName: string; // Kecamatan
  provinceName: string;
  finalScore: number;
  previousScore: number;
  status: IdmStatus;
  dimensions: {
    social: DimensionData;
    economic: DimensionData;
    environment: DimensionData;
  };
  recommendations: string[];
}

// --- Dummy Data ---
const villageData: IdmData = {
  year: 2024,
  villageName: 'Desa Gemah Ripah',
  districtName: 'Kecamatan Makmur',
  provinceName: 'Jawa Barat',
  finalScore: 0.8942,
  previousScore: 0.812,
  status: 'MANDIRI',
  dimensions: {
    social: {
      label: 'Ketahanan Sosial (IKS)',
      score: 0.91,
      description: 'Kesehatan, Pendidikan, dan Modal Sosial',
      indicators_passed: 35,
      total_indicators: 38,
    },
    economic: {
      label: 'Ketahanan Ekonomi (IKE)',
      score: 0.82,
      description: 'Keragaman Produksi, Perdagangan, dan Akses Logistik',
      indicators_passed: 12,
      total_indicators: 15,
    },
    environment: {
      label: 'Ketahanan Lingkungan (IKL)',
      score: 0.95,
      description: 'Kualitas Lingkungan dan Penanganan Bencana',
      indicators_passed: 8,
      total_indicators: 8,
    },
  },
  recommendations: [
    'Peningkatan akses pasar digital untuk produk UMKM desa.',
    'Perluasan cakupan layanan kesehatan posyandu lansia.',
    'Pemeliharaan infrastruktur jalan usaha tani.',
  ],
};

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 80, damping: 15 },
  },
};

const scoreVariants = (target: number): Variants => ({
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'circOut' },
  },
});

export default function SingleVillageIdm() {
  const villageInfo = useVillageStore((state) => state.village);
  const [mounted, setMounted] = useState<boolean>(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 transition-colors duration-300">
      <motion.div
        className="max-w-5xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge
                variant="outline"
                className="border-emerald-500 text-emerald-600 dark:text-emerald-400"
              >
                Tahun Anggaran {villageData.year}
              </Badge>
              <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Target className="w-3 h-3" /> Target: Pertahankan Status
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Indeks Desa Membangun
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {villageInfo?.villageName}, {villageInfo?.districtName}
            </p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20">
            <Download className="mr-2 h-4 w-4" /> Unduh Laporan PDF
          </Button>
        </motion.div>

        {/* Hero Score Card */}
        <motion.div variants={cardVariants}>
          <Card className="border-none overflow-hidden relative shadow-2xl bg-linear-to-br from-emerald-600 to-teal-800 dark:from-emerald-900 dark:to-teal-950">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

            <CardContent className="p-8 md:p-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left space-y-2">
                <h2 className="text-emerald-100 text-lg font-medium tracking-wide uppercase">
                  Skor IDM Saat Ini
                </h2>
                <div className="flex items-baseline gap-2 justify-center md:justify-start">
                  <motion.span
                    className="text-6xl md:text-7xl font-bold text-white tracking-tighter"
                    variants={scoreVariants(villageData.finalScore)}
                  >
                    {villageData.finalScore}
                  </motion.span>
                  <span className="text-emerald-200 text-sm font-medium">
                    / 1.0000
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>
                    Naik{' '}
                    {(
                      villageData.finalScore - villageData.previousScore
                    ).toFixed(4)}{' '}
                    poin dari tahun lalu
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 min-w-[200px]">
                <Award className="w-12 h-12 text-yellow-300 mb-2" />
                <span className="text-emerald-100 text-sm uppercase font-semibold">
                  Status Desa
                </span>
                <span className="text-3xl font-bold text-white mt-1">
                  {villageData.status}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dimensions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Social Dimension */}
          <DimensionCard
            icon={<Users className="w-5 h-5" />}
            title="Ketahanan Sosial"
            data={villageData.dimensions.social}
            colorClass="bg-blue-500"
            theme="blue"
          />
          {/* Economic Dimension */}
          <DimensionCard
            icon={<Coins className="w-5 h-5" />}
            title="Ketahanan Ekonomi"
            data={villageData.dimensions.economic}
            colorClass="bg-emerald-500"
            theme="emerald"
          />
          {/* Environment Dimension */}
          <DimensionCard
            icon={<Leaf className="w-5 h-5" />}
            title="Ketahanan Lingkungan"
            data={villageData.dimensions.environment}
            colorClass="bg-teal-500"
            theme="teal"
          />
        </div>

        {/* Recommendations / Analysis Section */}
        <motion.div
          variants={cardVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Kekuatan Utama
              </CardTitle>
              <CardDescription>Indikator dengan skor maksimal</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
                  Akses fasilitas kesehatan yang memadai (Bidan & Posyandu).
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
                  Mitigasi bencana alam dan sistem peringatan dini yang aktif.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" />
                  Ketersediaan listrik dan sinyal komunikasi stabil.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
                <AlertCircle className="w-5 h-5" />
                Rekomendasi Pembangunan
              </CardTitle>
              <CardDescription>
                Prioritas untuk tahun anggaran berikutnya
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {villageData.recommendations.map((rec, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                    {rec}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

// --- Sub-Components (Typed) ---

interface DimensionCardProps {
  icon: React.ReactNode;
  title: string;
  data: DimensionData;
  colorClass: string;
  theme: 'blue' | 'emerald' | 'teal';
}

function DimensionCard({
  icon,
  title,
  data,
  colorClass,
  theme,
}: DimensionCardProps) {
  // Mapping theme string to specific border/bg colors for light/dark
  const themeStyles = {
    blue: 'border-t-blue-500 dark:border-t-blue-400',
    emerald: 'border-t-emerald-500 dark:border-t-emerald-400',
    teal: 'border-t-teal-500 dark:border-t-teal-400',
  };

  return (
    <motion.div variants={cardVariants} className="h-full">
      <Card
        className={`h-full border-t-4 shadow-md bg-white dark:bg-slate-900 border-x-slate-200 border-b-slate-200 dark:border-x-slate-800 dark:border-b-slate-800 ${themeStyles[theme]}`}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <div
              className={`p-2 rounded-lg bg-opacity-10 dark:bg-opacity-20 ${colorClass
                .replace('bg-', 'bg-')
                .replace('500', '100')} ${colorClass.replace('bg-', 'text-')}`}
            >
              {icon}
            </div>
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {data.score}
            </span>
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="text-xs h-10 line-clamp-2">
            {data.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mt-2">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>Progress Indikator</span>
              <span>
                {Math.round(
                  (data.indicators_passed / data.total_indicators) * 100,
                )}
                %
              </span>
            </div>
            {/* Custom Animated Progress Bar */}
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${colorClass}`}
                initial={{ width: 0 }}
                whileInView={{
                  width: `${
                    (data.indicators_passed / data.total_indicators) * 100
                  }%`,
                }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                viewport={{ once: true }}
              />
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 text-right">
              {data.indicators_passed} dari {data.total_indicators} indikator
              terpenuhi
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
