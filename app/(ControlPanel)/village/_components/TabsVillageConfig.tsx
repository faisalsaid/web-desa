'use client';

import Image from 'next/image';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Hash,
  Users,
  Ruler,
  Mountain,
  Compass,
  FileText,
  Map,
  Fingerprint,
  LandPlot,
} from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { VillageConfigType } from '../_lib/villageConfig.type';
import { LucideIcon } from 'lucide-react';

// Helper Component untuk Item Data
const InfoItem = ({
  icon: Icon,
  label,
  value,
  suffix = '',
}: {
  icon: LucideIcon;
  label: string;
  value: string | number | undefined | null;
  suffix?: string;
}) => {
  const isSet = value !== null && value !== undefined && value !== '';

  return (
    <div className="flex items-start p-3 rounded-lg border border-zinc-100 bg-white dark:bg-zinc-900 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-900 transition-all duration-300">
      <div className="mr-3 mt-1 p-2 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
        <Icon size={18} />
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p
          className={`font-semibold truncate ${
            isSet
              ? 'text-zinc-800 dark:text-zinc-100'
              : 'text-zinc-400 italic text-sm'
          }`}
        >
          {isSet ? `${value}${suffix}` : 'Belum diatur'}
        </p>
      </div>
    </div>
  );
};

const TabsVillageConfig = ({ data }: { data: VillageConfigType | null }) => {
  return (
    <Card className="w-full shadow-lg border-t-4 border-t-emerald-500 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-emerald-800 dark:text-emerald-400">
          Konfigurasi Desa
        </CardTitle>
        <CardDescription>
          Informasi detail mengenai profil, identitas, dan geografis desa.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          {/* Tabs Navigation */}
          <div className="overflow-x-auto pb-4 no-scrollbar">
            <TabsList className="w-full sm:w-auto inline-flex h-11 items-center justify-start rounded-lg bg-zinc-100 dark:bg-zinc-900 p-1 text-zinc-500">
              <TabsTrigger
                className="px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm dark:data-[state=active]:bg-zinc-800 dark:data-[state=active]:text-emerald-400 transition-all"
                value="general"
              >
                <Building2 className="w-4 h-4 mr-2" /> Umum
              </TabsTrigger>
              <TabsTrigger
                className="px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm dark:data-[state=active]:bg-zinc-800 dark:data-[state=active]:text-emerald-400 transition-all"
                value="identity"
              >
                <Fingerprint className="w-4 h-4 mr-2" /> Identitas
              </TabsTrigger>
              <TabsTrigger
                className="px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm dark:data-[state=active]:bg-zinc-800 dark:data-[state=active]:text-emerald-400 transition-all"
                value="geo"
              >
                <Map className="w-4 h-4 mr-2" /> Geografis
              </TabsTrigger>
            </TabsList>
          </div>

          {/* 1. KONTEN UMUM */}
          <TabsContent
            value="general"
            className="mt-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-500 flex items-center">
                <Hash className="w-4 h-4 mr-2" /> Administratif Wilayah
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoItem
                  icon={Fingerprint}
                  label="ID Desa"
                  value={data?.villageCode}
                />
                <InfoItem
                  icon={Building2}
                  label="Nama Desa"
                  value={data?.villageName}
                />
                <InfoItem
                  icon={Calendar}
                  label="Tahun Berdiri"
                  value={data?.establishedYear}
                />

                <InfoItem
                  icon={MapPin}
                  label="Kecamatan"
                  value={data?.districtName}
                />
                <InfoItem
                  icon={Hash}
                  label="Kode Kec."
                  value={data?.districtCode}
                />

                <InfoItem
                  icon={MapPin}
                  label="Kabupaten"
                  value={data?.regencyName}
                />
                <InfoItem
                  icon={Hash}
                  label="Kode Kab."
                  value={data?.regencyCode}
                />

                <InfoItem
                  icon={MapPin}
                  label="Provinsi"
                  value={data?.provinceName}
                />
                <InfoItem
                  icon={Hash}
                  label="Kode Prov."
                  value={data?.provinceCode}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-500 flex items-center">
                <Phone className="w-4 h-4 mr-2" /> Kontak & Digital
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  icon={MapPin}
                  label="Alamat Kantor"
                  value={data?.officeAddress}
                />
                <InfoItem
                  icon={Hash}
                  label="Kode Pos"
                  value={data?.postalCode}
                />
                <InfoItem
                  icon={Phone}
                  label="No. Telepon"
                  value={data?.phone}
                />
                <InfoItem icon={Mail} label="Email Resmi" value={data?.email} />
                <InfoItem icon={Globe} label="Website" value={data?.website} />
              </div>
            </div>
          </TabsContent>

          {/* 2. KONTEN IDENTITAS */}
          <TabsContent
            value="identity"
            className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Kolom Kiri: Gambar */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white rounded-full shadow-lg flex items-center justify-center p-4">
                    <Image
                      src={data?.logoUrl || '/img/logo-desa.png'}
                      alt="Logo Desa"
                      width={160}
                      height={160}
                      className="object-contain"
                    />
                  </div>
                  <Badge
                    variant="outline"
                    className="border-emerald-500 text-emerald-600"
                  >
                    Logo Desa
                  </Badge>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-xl overflow-hidden">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={data?.logoUrl || '/img/logo-desa-dummy.png'}
                      alt="Kantor Desa"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 text-center border-t">
                    <span className="text-xs font-medium text-muted-foreground">
                      Foto Kantor Desa
                    </span>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Teks */}
              <div className="lg:col-span-2 space-y-6">
                {/* Slogan */}
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800">
                  <h3 className="text-sm font-semibold text-emerald-800 dark:text-emerald-400 mb-1">
                    Slogan Desa
                  </h3>
                  <p className="text-lg font-serif italic text-emerald-700 dark:text-emerald-300">
                    {data?.slogan ? `" ${data?.slogan}"` : '"Belum ada slogan"'}
                  </p>
                </div>

                {/* Visi */}
                <div>
                  <h3 className="font-semibold flex items-center text-zinc-800 dark:text-zinc-200 mb-2">
                    <FileText className="w-4 h-4 mr-2 text-emerald-500" /> Visi
                  </h3>
                  <div className="p-4 bg-white dark:bg-zinc-900 border rounded-lg shadow-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {data?.vision || (
                      <span className="italic text-muted-foreground">
                        Belum diatur
                      </span>
                    )}
                  </div>
                </div>

                {/* Misi */}
                <div>
                  <h3 className="font-semibold flex items-center text-zinc-800 dark:text-zinc-200 mb-2">
                    <FileText className="w-4 h-4 mr-2 text-emerald-500" /> Misi
                  </h3>
                  <div className="p-4 bg-white dark:bg-zinc-900 border rounded-lg shadow-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 whitespace-pre-line">
                    {data?.mission || (
                      <span className="italic text-muted-foreground">
                        Belum diatur
                      </span>
                    )}
                  </div>
                </div>

                {/* Deskripsi */}
                <div>
                  <h3 className="font-semibold flex items-center text-zinc-800 dark:text-zinc-200 mb-2">
                    <FileText className="w-4 h-4 mr-2 text-emerald-500" />{' '}
                    Deskripsi Singkat
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {data?.description || 'Tidak ada deskripsi.'}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 3. KONTEN GEOGRAFIS */}
          <TabsContent
            value="geo"
            className="mt-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            {/* Statistik Utama */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-emerald-600 text-white p-4 rounded-xl shadow-lg shadow-emerald-500/20 text-center">
                <Users className="w-6 h-6 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">
                  {data?.populationTotal || 0}
                </div>
                <div className="text-xs opacity-90">Penduduk</div>
              </div>
              <div className="bg-white dark:bg-zinc-900 border p-4 rounded-xl text-center shadow-sm">
                <Ruler className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
                <div className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                  {data?.areaSize || 0}
                </div>
                <div className="text-xs text-muted-foreground">Luas (km²)</div>
              </div>
              <div className="bg-white dark:bg-zinc-900 border p-4 rounded-xl text-center shadow-sm">
                <LandPlot className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
                <div className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                  {data?.hamletCount || 0}
                </div>
                <div className="text-xs text-muted-foreground">Dusun</div>
              </div>
              <div className="bg-white dark:bg-zinc-900 border p-4 rounded-xl text-center shadow-sm">
                <Mountain className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
                <div className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                  {data?.elevation || 0}
                </div>
                <div className="text-xs text-muted-foreground">
                  Ketinggian (mdpl)
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Detail Administratif Kecil */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-zinc-500">
                  Pembagian Wilayah
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem
                    icon={Hash}
                    label="Jumlah RW"
                    value={data?.rwCount}
                  />
                  <InfoItem
                    icon={Hash}
                    label="Jumlah RT"
                    value={data?.rtCount}
                  />
                </div>

                <h3 className="text-sm font-semibold text-zinc-500 pt-2">
                  Koordinat Peta
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem
                    icon={MapPin}
                    label="Latitude"
                    value={data?.latitude ? Number(data.latitude) : null}
                  />
                  <InfoItem
                    icon={MapPin}
                    label="Longitude"
                    value={data?.longitude ? Number(data.longitude) : null}
                  />
                </div>
              </div>

              {/* Batas Wilayah */}
              <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-5 border">
                <h3 className="text-sm font-semibold text-zinc-500 mb-4 flex items-center">
                  <Compass className="w-4 h-4 mr-2" /> Batas Wilayah
                </h3>
                <div className="space-y-3 relative">
                  {/* Visual Line */}
                  <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-zinc-200 dark:bg-zinc-700"></div>

                  <div className="relative flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border flex items-center justify-center shrink-0 z-10 text-xs font-bold text-emerald-600">
                      U
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Utara</p>
                      <p className="font-medium text-sm">
                        {data?.borderNorth || '-'}
                      </p>
                    </div>
                  </div>
                  <div className="relative flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border flex items-center justify-center shrink-0 z-10 text-xs font-bold text-emerald-600">
                      T
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Timur</p>
                      <p className="font-medium text-sm">
                        {data?.borderEast || '-'}
                      </p>
                    </div>
                  </div>
                  <div className="relative flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border flex items-center justify-center shrink-0 z-10 text-xs font-bold text-emerald-600">
                      S
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Selatan</p>
                      <p className="font-medium text-sm">
                        {data?.borderSouth || '-'}
                      </p>
                    </div>
                  </div>
                  <div className="relative flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border flex items-center justify-center shrink-0 z-10 text-xs font-bold text-emerald-600">
                      B
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Barat</p>
                      <p className="font-medium text-sm">
                        {data?.borderWest || '-'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TabsVillageConfig;
