'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { useVillageStore } from '@/store/villageStore';

const WelcomeSentenceSection = () => {
  const village = useVillageStore((state) => state.village);
  const headOfVillage = useVillageStore((state) => state.headOfVillage);

  return (
    <div className="space-y-4 md:flex gap-4">
      <div className="flex items-center justify-center md:w-1/3">
        <Image
          className=""
          src={'/img/kepala-desa.png'}
          alt="Logo Desa Torino"
          width={200}
          height={200}
        />
      </div>
      <div className="space-y-4 md:w-2/3">
        <p className="text-center text-lg font-semibold text-green-600 sm:text-3xl">
          Sambutan Kepala Desa{' '}
          {village?.villageName ? village.villageName : 'Torino'}
        </p>
        <div className="text-center">
          <p className="text-2xl font-semibold">
            {headOfVillage?.name ? headOfVillage.name : 'Antonio Conte'}
          </p>
          <p className="text-muted-foreground">
            Kepala Desa {village?.villageName ? village.villageName : 'Torino'}
          </p>
        </div>
        <ScrollArea className="h-56 ">
          <div className="space-y-2">
            <div className="">
              Selamat datang di Website Resmi Desa Tamher Barat. Sebagai desa
              pesisir yang kaya akan potensi laut dan budaya, kami berkomitmen
              menghadirkan layanan informasi yang transparan, cepat, dan mudah
              diakses oleh seluruh masyarakat. Melalui website ini, kami
              berharap setiap program pembangunan, kegiatan desa, dan potensi
              wilayah dapat tersampaikan dengan baik serta mendorong partisipasi
              aktif warga dalam mewujudkan Desa Tamher Barat yang maju,
              sejahtera, dan berdaya saing.
            </div>
            <div>
              <p className="text-lg font-semibold">
                {headOfVillage?.name ? headOfVillage.name : 'Antonio Conte'}
              </p>
              <p className="text-sm">
                Kepala Desa{' '}
                {village?.villageName ? village.villageName : 'Torino'}
              </p>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default WelcomeSentenceSection;
