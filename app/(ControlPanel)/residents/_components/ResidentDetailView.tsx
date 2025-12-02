'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  GraduationCap,
  Heart,
  Globe,
  Flag,
  User,
  Droplets,
  Copy,
  Users,
  Building2,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

// --- 1. TYPE MOCKUP (Sesuai Prisma) ---
// Kita sederhanakan enum menjadi string untuk keperluan display
type ResidentDetail = {
  id: number;
  nik: string;
  fullName: string;
  imageUrl: string;
  gender: 'MALE' | 'FEMALE';
  birthPlace: string;
  birthDate: string; // ISO String
  religion: string;
  education: string;
  occupation: string;
  maritalStatus: string;
  bloodType: string;
  citizenship: string;
  ethnicity: string;
  nationality: string;
  address: string;
  dusun: string;
  rw: string;
  rt: string;
  phone: string;
  email: string;
  populationStatus: 'PERMANENT' | 'TEMPORARY' | 'MOVED';
  familyRelationship: string;
  isActive: boolean;
};

// --- 2. HARDCODED DUMMY DATA ---
const RESIDENT_DATA: ResidentDetail = {
  id: 101,
  nik: '3302150101900005',
  fullName: 'Raden Mas Suryo Kusumo',
  imageUrl:
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&auto=format&fit=crop',
  gender: 'MALE',
  birthPlace: 'Yogyakarta',
  birthDate: '1990-05-12T00:00:00Z',
  religion: 'ISLAM',
  education: 'S1 - Teknik Sipil',
  occupation: 'Arsitek Lepas',
  maritalStatus: 'MENIKAH',
  bloodType: 'AB',
  citizenship: 'WNI',
  ethnicity: 'Jawa',
  nationality: 'Indonesia',
  address: 'Jl. Malioboro No. 45, Gang Kenanga II',
  dusun: 'Dusun Krapyak',
  rt: '04',
  rw: '12',
  phone: '0812-3456-7890',
  email: 'suryo.kusumo@gmail.com',
  populationStatus: 'PERMANENT',
  familyRelationship: 'KEPALA KELUARGA',
  isActive: true,
};

// Helper Component untuk Item Info
const InfoItem = ({ icon: Icon, label, value, className }: any) => (
  <div className={`flex items-start gap-3 ${className}`}>
    <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
      <Icon className="h-4 w-4" />
    </div>
    <div>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value || '-'}</p>
    </div>
  </div>
);

export default function ResidentDetailView() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50  dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* --- HEADER SECTION --- */}
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg dark:bg-zinc-900">
          {/* Background Gradient & Pattern */}
          <div className="h-40 w-full bg-linear-to-r from-emerald-600 to-teal-500">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-30 mix-blend-overlay" />
          </div>

          <div className="relative flex flex-col items-start px-8 pb-8 sm:flex-row sm:items-end sm:gap-6">
            {/* Avatar */}
            <div className="-mt-16 shrink-0">
              <Avatar className="h-32 w-32 border-[6px] border-white shadow-xl dark:border-zinc-900">
                <AvatarImage
                  src={RESIDENT_DATA.imageUrl}
                  className="object-cover"
                />
                <AvatarFallback className="text-3xl font-bold">
                  {RESIDENT_DATA.fullName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Identity Info */}
            <div className="mt-4 flex-1 sm:mt-0 sm:pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {RESIDENT_DATA.fullName}
                  </h1>
                  <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                    <span className="font-mono text-lg font-medium tracking-wide">
                      {RESIDENT_DATA.nik}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground/70"
                      title="Copy NIK"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="mt-4 flex gap-2 sm:mt-0">
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300"
                  >
                    {RESIDENT_DATA.populationStatus}
                  </Badge>
                  <Badge
                    className={
                      RESIDENT_DATA.isActive
                        ? 'bg-emerald-500 hover:bg-emerald-600'
                        : 'bg-rose-500 hover:bg-rose-600'
                    }
                  >
                    {RESIDENT_DATA.isActive ? (
                      <>
                        <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Aktif
                      </>
                    ) : (
                      <>
                        <XCircle className="mr-1 h-3.5 w-3.5" /> Non-Aktif
                      </>
                    )}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* COLUMN LEFT: Essential Info (Sidebar Style) */}
          <div className="space-y-6">
            {/* Kartu Lokasi */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="h-5 w-5 text-emerald-500" />
                  Domisili
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">
                    {RESIDENT_DATA.dusun}
                  </p>
                  <div className="mt-1 flex gap-2 text-muted-foreground">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-semibold dark:bg-slate-800">
                      RT {RESIDENT_DATA.rt}
                    </span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-semibold dark:bg-slate-800">
                      RW {RESIDENT_DATA.rw}
                    </span>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Alamat Lengkap
                  </p>
                  <p className="mt-1 leading-relaxed">
                    {RESIDENT_DATA.address}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Kartu Kontak */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Phone className="h-5 w-5 text-blue-500" />
                  Kontak
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <InfoItem
                  icon={Phone}
                  label="Telepon / WhatsApp"
                  value={RESIDENT_DATA.phone}
                />
                <InfoItem
                  icon={Mail}
                  label="Email"
                  value={RESIDENT_DATA.email}
                />
              </CardContent>
            </Card>

            {/* Kartu Medis / Biologis Ringkas */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="flex flex-col items-center justify-center py-6 shadow-sm border-l-4 border-l-rose-500">
                <Droplets className="mb-2 h-6 w-6 text-rose-500" />
                <p className="text-xs text-muted-foreground">Gol. Darah</p>
                <p className="text-2xl font-bold">{RESIDENT_DATA.bloodType}</p>
              </Card>
              <Card className="flex flex-col items-center justify-center py-6 shadow-sm border-l-4 border-l-indigo-500">
                <User className="mb-2 h-6 w-6 text-indigo-500" />
                <p className="text-xs text-muted-foreground">Gender</p>
                <p className="text-lg font-bold">
                  {RESIDENT_DATA.gender === 'MALE' ? 'Laki-Laki' : 'Perempuan'}
                </p>
              </Card>
            </div>
          </div>

          {/* COLUMN RIGHT: Detailed Data */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section: Data Pribadi */}
            <Card className="shadow-md border-t-4 border-t-emerald-500">
              <CardHeader>
                <CardTitle className="text-lg">Informasi Pribadi</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <InfoItem
                  icon={Calendar}
                  label="Tempat, Tanggal Lahir"
                  value={`${RESIDENT_DATA.birthPlace}, ${formatDate(
                    RESIDENT_DATA.birthDate,
                  )}`}
                  className="sm:col-span-2"
                />
                <InfoItem
                  icon={Flag}
                  label="Kewarganegaraan"
                  value={RESIDENT_DATA.citizenship}
                />
                <InfoItem
                  icon={Globe}
                  label="Kebangsaan"
                  value={RESIDENT_DATA.nationality}
                />
                <InfoItem
                  icon={Building2}
                  label="Suku / Etnis"
                  value={RESIDENT_DATA.ethnicity}
                />
                <InfoItem
                  icon={Heart}
                  label="Agama"
                  value={RESIDENT_DATA.religion}
                />
              </CardContent>
            </Card>

            {/* Section: Sosial & Ekonomi */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Sosial & Pekerjaan</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <InfoItem
                  icon={GraduationCap}
                  label="Pendidikan Terakhir"
                  value={RESIDENT_DATA.education}
                />
                <InfoItem
                  icon={Briefcase}
                  label="Pekerjaan"
                  value={RESIDENT_DATA.occupation}
                />
                <InfoItem
                  icon={Heart}
                  label="Status Pernikahan"
                  value={RESIDENT_DATA.maritalStatus}
                />
              </CardContent>
            </Card>

            {/* Section: Keluarga */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Status Keluarga</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 rounded-lg border border-dashed p-4 bg-muted/30">
                  <div className="rounded-full bg-orange-100 p-3 text-orange-600 dark:bg-orange-900/20">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Hubungan dalam Keluarga
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {RESIDENT_DATA.familyRelationship}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Button variant="outline" size="sm">
                      Lihat Kartu Keluarga
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
