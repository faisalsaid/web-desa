'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Ruler,
  Mountain,
  Landmark,
  Building2,
  //   ArrowRight,
  Compass,
  Quote,
  Layers,
  Home,
  LucideIcon,
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { VillageProfile } from '../_lib/actions/getConfigVilage';

// --- Utility untuk Tailwind Class ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      'rounded-xl border border-zinc-200 bg-white/50 text-zinc-950 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-50',
      className,
    )}
  >
    {children}
  </div>
);

const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400',
      className,
    )}
  >
    {children}
  </span>
);

// --- Animation Variants ---
const containerVar = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVar = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 50 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

// --- Main Page Component ---

export default function VillageProfilePagePublic({
  villageData,
}: {
  villageData: VillageProfile;
}) {
  const data = villageData; // In real app, receive this as props

  return (
    <main className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-emerald-500/30">
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        {/* Background Image / Placeholder */}
        <div className="absolute inset-0 z-0">
          {data.officePhotoUrl ? (
            <img
              src={data.officePhotoUrl}
              alt="Kantor Desa"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-linear-to-br from-emerald-900 via-emerald-800 to-zinc-900">
              {/* Abstract Pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(#10b981 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              ></div>
            </div>
          )}
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-zinc-50 via-transparent to-black/40 dark:from-zinc-950" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20 md:px-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <Badge className="px-4 py-1 text-sm uppercase tracking-wider">
                Desa Digital
              </Badge>
              {data.establishedYear && (
                <Badge className="border-zinc-500 bg-zinc-800 text-zinc-300">
                  Est. {data.establishedYear}
                </Badge>
              )}
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-7xl drop-shadow-lg">
              Desa {data.villageName}
            </h1>

            <p className="max-w-2xl text-xl font-medium text-emerald-100/90 md:text-2xl">
              "{data.slogan}"
            </p>

            <div className="flex flex-wrap gap-4 pt-4 text-white/80">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-emerald-400" />{' '}
                {data.provinceName}
              </span>
              <span className="hidden h-4 w-px bg-white/30 sm:block"></span>
              <span className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-emerald-400" /> Kab.{' '}
                {data.regencyName}
              </span>
              <span className="hidden h-4 w-px bg-white/30 sm:block"></span>
              <span className="flex items-center gap-1.5">
                <Landmark className="h-4 w-4 text-emerald-400" /> Kec.{' '}
                {data.districtName}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS GRID (Floating) */}
      <section className="relative z-20 -mt-16 px-6 md:px-10">
        <motion.div
          variants={containerVar}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <StatCard
            icon={Users}
            label="Populasi"
            value={
              data?.populationTotal
                ? data?.populationTotal.toLocaleString('id-ID')
                : ''
            }
            sub="Jiwa"
            delay={0}
          />
          <StatCard
            icon={Ruler}
            label="Luas Wilayah"
            value={data?.areaSize?.toLocaleString() || ''}
            sub={data.areaUnit || ''}
            delay={0.1}
          />
          <StatCard
            icon={Mountain}
            label="Ketinggian"
            value={data.elevation || ''}
            sub="MDPL"
            delay={0.2}
          />
          <StatCard
            icon={Layers}
            label="Administrasi"
            value={`${data.hamletCount} Dusun`}
            sub={`${data.rwCount} RW / ${data.rtCount} RT`}
            delay={0.3}
          />
        </motion.div>
      </section>

      {/* 3. MAIN CONTENT */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-16 md:grid-cols-12 md:px-10">
        {/* LEFT COLUMN (Details) */}
        <div className="space-y-8 md:col-span-8">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Tentang Desa
            </h2>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
              {data.description}
            </p>
          </motion.div>

          <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />

          {/* Vision & Mission */}
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 p-8 text-white shadow-xl"
            >
              <div className="absolute right-0 top-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-all group-hover:bg-white/20" />
              <Quote className="mb-4 h-8 w-8 text-emerald-200" />
              <h3 className="mb-2 text-2xl font-bold">Visi</h3>
              <p className="font-medium leading-relaxed text-emerald-50">
                {data.vision}
              </p>
            </motion.div>

            <Card className="flex flex-col justify-center border-l-4 border-l-emerald-500 p-8 shadow-md">
              <h3 className="mb-2 flex items-center gap-2 text-2xl font-bold text-zinc-900 dark:text-white">
                <Compass className="h-6 w-6 text-emerald-500" /> Misi
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">{data.mission}</p>
            </Card>
          </div>

          {/* Boundaries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/50"
          >
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-zinc-900 dark:text-white">
              <MapPin className="h-5 w-5 text-emerald-500" /> Batas Wilayah
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <BoundaryItem
                label="Utara"
                value={data.borderNorth || ''}
                dir="N"
              />
              <BoundaryItem
                label="Timur"
                value={data.borderEast || ''}
                dir="E"
              />
              <BoundaryItem
                label="Selatan"
                value={data.borderSouth || ''}
                dir="S"
              />
              <BoundaryItem
                label="Barat"
                value={data.borderWest || ''}
                dir="W"
              />
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN (Sidebar Info) */}
        <div className="md:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="sticky top-10 space-y-6"
          >
            {/* Quick Info Card */}
            <Card className="overflow-hidden shadow-lg">
              <div className="bg-emerald-600 p-4 text-white">
                <h3 className="text-lg font-bold">Informasi Kantor</h3>
              </div>
              <div className="flex flex-col gap-4 p-6">
                <InfoRow
                  icon={Home}
                  label="Alamat"
                  value={data.officeAddress || ''}
                />
                <InfoRow
                  icon={Phone}
                  label="Telepon"
                  value={data.phone || ''}
                  isLink
                  href={`tel:${data.phone}`}
                />
                <InfoRow
                  icon={Mail}
                  label="Email"
                  value={data.email || ''}
                  isLink
                  href={`mailto:${data.email}`}
                />
                <InfoRow
                  icon={Globe}
                  label="Website"
                  value={data?.website?.replace('https://', '') || ''}
                  isLink
                  href={data.website || ''}
                />
              </div>
            </Card>

            {/* Code Badge */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center dark:border-zinc-700 dark:bg-zinc-900">
              <span className="text-sm font-medium text-zinc-500">
                Kode Desa (Kemendagri)
              </span>
              <span className="mt-1 font-mono text-2xl font-bold tracking-widest text-emerald-600 dark:text-emerald-400">
                {data.villageCode}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FOOTER DECORATION */}
      <div className="h-2 w-full bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-500" />
    </main>
  );
}

// --- Helper Components ---

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: //   delay,
{
  icon: LucideIcon;
  label: string;
  value: string | number;
  sub: string;
  delay: number;
}) {
  return (
    <motion.div
      variants={itemVar}
      className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/10 transition-transform group-hover:scale-150 dark:bg-emerald-500/5" />
      <div className="relative flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {label}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {value}
            </span>
            <span className="text-xs font-semibold text-zinc-400">{sub}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BoundaryItem({
  label,
  value,
  dir,
}: {
  label: string;
  value: string;
  dir: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-zinc-100 bg-white p-3 shadow-sm transition-colors hover:border-emerald-200 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-100 font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
        {dir}
      </div>
      <div>
        <p className="text-xs text-zinc-400">{label}</p>
        <p className="font-medium text-zinc-800 dark:text-zinc-200">{value}</p>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  isLink,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  isLink?: boolean;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
      <div className="flex-1 overflow-hidden">
        <p className="text-xs font-medium text-zinc-400">{label}</p>
        {isLink ? (
          <a
            href={href}
            className="block truncate font-medium text-zinc-800 decoration-emerald-500/50 hover:text-emerald-600 hover:underline dark:text-zinc-200 dark:hover:text-emerald-400"
          >
            {value}
          </a>
        ) : (
          <p className="font-medium text-zinc-800 dark:text-zinc-200">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}
