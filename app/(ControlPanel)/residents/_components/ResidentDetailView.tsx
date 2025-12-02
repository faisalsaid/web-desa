'use client';

import React, { JSX } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  Education,
  MaritalStatus,
  Occupation,
  Religion,
  Resident,
} from '@prisma/client';
import ImageWrapper from '@/components/ImageWraper';
import {
  educationLabels,
  maritalStatusLabels,
  occupationLabels,
  religionLabels,
} from '@/lib/enum';

// --------------------------------------------------
// Typed Props for InfoItem (no `any`)
// icon: an SVG React component (lucide icons fit this signature)
// value: ReactNode so it can be string, number, element, etc.
// className: optional string
// --------------------------------------------------
interface InfoItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value?: React.ReactNode;
  className?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({
  icon: Icon,
  label,
  value,
  className,
}) => (
  <div className={`flex items-start gap-3 ${className ?? ''}`}>
    <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
      <Icon className="h-4 w-4" />
    </div>
    <div>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value ?? '-'}</p>
    </div>
  </div>
);

// --------------------------------------------------
// ResidentDetailView props: resident typed from Prisma's Resident
// Return JSX.Element
// --------------------------------------------------
export default function ResidentDetailView({
  resident,
}: {
  resident: Resident;
}): JSX.Element {
  const formatDate = (dateInput?: string | Date | null) => {
    if (!dateInput) return '-';
    const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (Number.isNaN(d.getTime())) return '-';
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // optional debug — hapus kalau sudah tidak perlu
  // console.log(resident.imageUrl);

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
              <div
                className="h-32 w-32  relative rounded-full
                      overflow-hidden border-[5px]"
              >
                <ImageWrapper
                  src={(resident.imageUrl as string) ?? ''}
                  alt={`Foto profil ${resident.fullName}`}
                  objectFit="cover"
                />
              </div>
            </div>

            {/* Identity Info */}
            <div className="mt-4 flex-1 sm:mt-0 sm:pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {resident.fullName}
                  </h1>
                  <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                    <span className="font-mono text-lg font-medium tracking-wide">
                      {resident.nik}
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
                    {resident.populationStatus}
                  </Badge>
                  <Badge
                    className={
                      resident.isActive
                        ? 'bg-emerald-500 hover:bg-emerald-600'
                        : 'bg-rose-500 hover:bg-rose-600'
                    }
                  >
                    {resident.isActive ? (
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
                    {resident.dusun}
                  </p>
                  <div className="mt-1 flex gap-2 text-muted-foreground">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-semibold dark:bg-slate-800">
                      RT {resident.rt}
                    </span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-semibold dark:bg-slate-800">
                      RW {resident.rw}
                    </span>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Alamat Lengkap
                  </p>
                  <p className="mt-1 leading-relaxed">{resident.address}</p>
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
                  value={resident.phone}
                />
                <InfoItem icon={Mail} label="Email" value={resident.email} />
              </CardContent>
            </Card>

            {/* Kartu Medis / Biologis Ringkas */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="flex flex-col items-center justify-center py-6 shadow-sm border-l-4 border-l-rose-500">
                <Droplets className="mb-2 h-6 w-6 text-rose-500" />
                <p className="text-xs text-muted-foreground">Gol. Darah</p>
                <p className="text-2xl font-bold">
                  {resident.bloodType === 'UNKNOWN' ? '-' : resident.bloodType}
                </p>
              </Card>
              <Card className="flex flex-col items-center justify-center py-6 shadow-sm border-l-4 border-l-indigo-500">
                <User className="mb-2 h-6 w-6 text-indigo-500" />
                <p className="text-xs text-muted-foreground">Gender</p>
                <p className="text-lg font-bold">
                  {resident.gender === 'MALE' ? 'Laki-Laki' : 'Perempuan'}
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
                  value={`${resident.birthPlace}, ${formatDate(
                    resident.birthDate as unknown as string,
                  )}`}
                  className="sm:col-span-2"
                />
                <InfoItem
                  icon={Flag}
                  label="Kewarganegaraan"
                  value={
                    resident.citizenship === 'WNI'
                      ? 'Warga Negara Indonesia'
                      : 'Warga Negara Asing'
                  }
                />
                <InfoItem
                  icon={Globe}
                  label="Kebangsaan"
                  value={resident.nationality}
                />
                <InfoItem
                  icon={Building2}
                  label="Suku / Etnis"
                  value={resident.ethnicity}
                />
                <InfoItem
                  icon={Heart}
                  label="Agama"
                  value={religionLabels[resident.religion as Religion]}
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
                  value={educationLabels[resident.education as Education]}
                />
                <InfoItem
                  icon={Briefcase}
                  label="Pekerjaan"
                  value={occupationLabels[resident.occupation as Occupation]}
                />
                <InfoItem
                  icon={Heart}
                  label="Status Pernikahan"
                  value={
                    maritalStatusLabels[resident.maritalStatus as MaritalStatus]
                  }
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
                      {resident.familyRelationship}
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
