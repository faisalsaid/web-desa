'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  Coins,
  TrendingUp,
  Landmark,
  type LucideIcon,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// --- IMPORT TIPE DARI FILE LIBRARY ANDA ---
// Sesuaikan path import ini dengan struktur folder Anda
import type { BudgetYearReportResponse } from '@/app/(root)/_lib/bugutYear.type';

// --- Interface Props untuk Sub-Components (Tetap Lokal) ---
interface SummaryCardProps {
  title: string;
  icon: LucideIcon;
  budget: number;
  realized: number;
  percentage: number;
  colorClass: string;
  delay: number;
}

interface DetailItemProps {
  label: string;
  budget: number;
  realized: number;
  percentage: number;
}

interface BudgetSectionProps {
  data: BudgetYearReportResponse;
}

// ... Helper formatIDR ...
const formatIDR = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
};

// ... Sub-Components (SummaryCard, DetailItem) biarkan sama ...
// (Kode SummaryCard dan DetailItem disembunyikan untuk menyingkat, pakai yang lama)
const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  icon: Icon,
  budget,
  realized,
  percentage,
  colorClass,
  delay,
}) => {
  /* ... Paste kode SummaryCard sebelumnya ... */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card
        className="h-full border-l-4 shadow-sm"
        style={{ borderLeftColor: colorClass }}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
            {title}
          </CardTitle>
          <div
            className="p-2 rounded-full bg-opacity-10"
            style={{ backgroundColor: `${colorClass}1A` }}
          >
            <Icon className="h-4 w-4" style={{ color: colorClass }} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatIDR(realized)}</div>
          <p className="text-xs text-muted-foreground mt-1 mb-3">
            dari target {formatIDR(budget)}
          </p>
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span>Realisasi</span>
              <span style={{ color: colorClass }}>{percentage}%</span>
            </div>
            <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${percentage}%`, backgroundColor: colorClass }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const DetailItem: React.FC<DetailItemProps> = ({
  label,
  budget,
  realized,
  percentage,
}) => (
  <div className="mb-4 last:mb-0 group">
    <div className="flex justify-between items-end mb-1">
      <span className="text-sm font-medium group-hover:text-primary transition-colors">
        {label}
      </span>
      <span className="text-xs font-bold bg-slate-100 px-2 py-0.5 rounded">
        {percentage}%
      </span>
    </div>
    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
      <span>Target: {formatIDR(budget)}</span>
      <span>Real: {formatIDR(realized)}</span>
    </div>
    <Progress value={percentage} className="h-1.5" />
  </div>
);

// ================= MAIN COMPONENT =================

export default function BudgetRealizationSection({ data }: BudgetSectionProps) {
  // 1. SAFETY CHECK (GUARD CLAUSE)
  // Karena data backend bisa status 'error' atau field optional undefined,
  // Kita harus cek dulu sebelum render.
  if (
    data.status !== 'success' ||
    !data.yearInfo ||
    !data.summary ||
    !data.details
  ) {
    // Return null agar section tidak muncul jika error,
    // atau tampilkan UI Error sederhana.
    return (
      <section className="py-16 text-center text-muted-foreground">
        <p>Data laporan anggaran belum tersedia.</p>
      </section>
    );
  }

  // Setelah if di atas, TypeScript tahu bahwa yearInfo, summary, dan details PASTI ADA.

  const colors = {
    revenue: '#10b981',
    expense: '#f43f5e',
    financing: '#3b82f6',
    silpa: '#8b5cf6',
  };

  const lastUpdatedDate = new Date(data.yearInfo.lastUpdated ?? new Date());

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* ... SISA KODE SAMA PERSIS SEPERTI SEBELUMNYA ... */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        {/* HEADER SECTION */}
        <div className="text-center mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border shadow-sm text-sm font-medium text-slate-600 dark:text-slate-300 mb-2"
          >
            <Landmark className="w-4 h-4 text-primary" />
            <span>APBDes Tahun Anggaran {data.yearInfo.year}</span>
            {data.yearInfo.isActive && (
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse ml-1" />
            )}
          </motion.div>

          <motion.h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Transparansi <span className="text-primary">Keuangan Desa</span>
          </motion.h2>

          <motion.p className="text-muted-foreground max-w-2xl mx-auto">
            Laporan realisasi pelaksanaan Anggaran Pendapatan dan Belanja Desa
            (APBDes) yang akuntabel.
            <br />
            <span className="text-xs text-slate-400">
              Terakhir diperbarui:{' '}
              {lastUpdatedDate.toLocaleDateString('id-ID', {
                dateStyle: 'long',
              })}
            </span>
          </motion.p>
        </div>

        {/* SUMMARY CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <SummaryCard
            title="Total Pendapatan"
            icon={ArrowDownCircle}
            budget={data.summary.revenue.totalBudget}
            realized={data.summary.revenue.totalRealized}
            percentage={data.summary.revenue.percentage}
            colorClass={colors.revenue}
            delay={0.1}
          />
          <SummaryCard
            title="Total Belanja"
            icon={ArrowUpCircle}
            budget={data.summary.expense.totalBudget}
            realized={data.summary.expense.totalRealized}
            percentage={data.summary.expense.percentage}
            colorClass={colors.expense}
            delay={0.2}
          />
          {/* PEMBIAYAAN */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card
              className="h-full border-l-4 shadow-sm"
              style={{ borderLeftColor: colors.financing }}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
                  Pembiayaan Netto
                </CardTitle>
                <div className="p-2 rounded-full bg-blue-50 text-blue-500">
                  <Coins className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatIDR(data.summary.financing.net)}
                </div>
                <div className="mt-4 space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Penerimaan:</span>
                    <span className="font-medium text-emerald-600">
                      +{formatIDR(data.summary.financing.receipt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pengeluaran:</span>
                    <span className="font-medium text-rose-600">
                      -{formatIDR(data.summary.financing.expenditure)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          {/* SILPA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="h-full bg-slate-900 text-white shadow-xl border-none relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-slate-300 uppercase">
                  Sisa Lebih (SiLPA)
                </CardTitle>
                <Wallet className="h-4 w-4 text-violet-400" />
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-white mb-1">
                  {formatIDR(data.summary.analysis.silpa)}
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  Akumulasi sisa dana tahun berjalan
                </p>
                <div className="flex items-center gap-2 text-xs bg-white/10 p-2 rounded-lg">
                  <TrendingUp className="h-3 w-3 text-green-400" />
                  <span className="text-slate-200">
                    Kondisi Keuangan:{' '}
                    <span className="font-bold text-green-400">Sehat</span>
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* DETAILS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full border-t-4 border-t-emerald-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Rincian Pendapatan
                </CardTitle>
                <CardDescription>Sumber dana masuk ke kas desa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.details.revenue.map((item, index) => (
                  <DetailItem
                    key={index}
                    label={item.label}
                    budget={item.budget}
                    realized={item.realized}
                    percentage={item.percentage}
                  />
                ))}
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full border-t-4 border-t-rose-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Rincian Belanja
                </CardTitle>
                <CardDescription>
                  Penggunaan dana per bidang kegiatan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.details.expense.map((item, index) => (
                  <DetailItem
                    key={index}
                    label={item.label}
                    budget={item.budget}
                    realized={item.realized}
                    percentage={item.percentage}
                  />
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
