'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VillageProfileType } from '../_lib/vilageProvile.type';
import Image from 'next/image';
import LogoForm from './LogoForm';

const TabsProfile = ({ data }: { data: VillageProfileType | null }) => {
  return (
    <Tabs defaultValue="general" className="">
      <div className="overflow-x-auto whitespace-nowrap flex no-scrollbar pb-3">
        <TabsList className="gap-4 ">
          <TabsTrigger className="hover:cursor-pointer" value="general">
            General
          </TabsTrigger>
          <TabsTrigger className="hover:cursor-pointer" value="vision-mision">
            Visi Misi
          </TabsTrigger>
          <TabsTrigger className="hover:cursor-pointer" value="location">
            Lokasi
          </TabsTrigger>
          <TabsTrigger className="hover:cursor-pointer" value="geo">
            Geografi
          </TabsTrigger>
          <TabsTrigger className="hover:cursor-pointer" value="border">
            Batas Wilayah
          </TabsTrigger>
          <TabsTrigger className="hover:cursor-pointer" value="map">
            Peta Lokasi
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="general">
        <div className="space-y-2 sm:grid sm:grid-flow-col sm:grid-rows-4 gap-y-2 gap-x-4">
          <div className="sm:row-span-4">
            <div className="p-2 bg-background rounded-lg">
              <p className="py-2">Logo :</p>
              <div className="p-4 bg-muted rounded-lg flex items-center justify-center relative">
                <Image
                  // className="bg-white rounded-full"
                  src={data?.logo ? data.logo : '/img/logo-desa-dummy.png'}
                  alt="Logo Desa Torino"
                  width={200}
                  height={200}
                />
                <div className="absolute bottom-0 right-0">
                  <LogoForm />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <ProfileCard title={'Nama'} text={data?.name} />
          </div>
          <div className="col-span-2">
            <ProfileCard title="Tagline" text={data?.tagline} />
          </div>
          <div className="sm:col-span-2 sm:row-span-2">
            <ProfileCard title="Deskripsi" text={data?.description} />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="vision-mision">
        <div className="space-y-2 sm:grid sm:grid-cols-2 gap-4">
          <ProfileCard title="Visi" text={data?.vision} />
          <ProfileCard title="Misi" text={data?.mission} />
        </div>
      </TabsContent>
      <TabsContent value="location">
        <div className="space-y-2 sm:grid sm:grid-cols-2 gap-4">
          <ProfileCard title="Propinsi" text={data?.province} />
          <ProfileCard title="Kabutapen" text={data?.regency} />
          <ProfileCard title="Kecamatan" text={data?.district} />
          <ProfileCard title="Kelurahan" text={data?.village} />
        </div>
      </TabsContent>
      <TabsContent value="geo">
        <div className="space-y-2 sm:grid sm:grid-cols-2 gap-4">
          <ProfileCard title="Laltitude" text={data?.latitude} />
          <ProfileCard title="Longtititude" text={data?.longitude} />
          <ProfileCard title="Luas wilayah" text={data?.areaKm2} />
          <ProfileCard title="Ketinggian" text={data?.elevation} />
        </div>
      </TabsContent>
      <TabsContent value="border">
        <div className="space-y-2 sm:grid sm:grid-cols-2 gap-4">
          <ProfileCard title="Utara" text={data?.northBorder} />
          <ProfileCard title="Timur" text={data?.eastBorder} />
          <ProfileCard title="Selatan" text={data?.southBorder} />
          <ProfileCard title="Barat" text={data?.westBorder} />
        </div>
      </TabsContent>
      <TabsContent value="map">
        <div className="space-y-2">
          <ProfileCard title="Peta" text={data?.mapUrl} />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TabsProfile;

interface ProfileCardProps {
  title: string;
  text: string | number | undefined | null;
}

const ProfileCard = ({ title, text }: ProfileCardProps) => {
  // const value = text ?? (
  //   <span className="italic text-muted-foreground">Not set</span>
  // );

  // Tambahkan satuan jika field tertentu
  const formattedValue =
    text !== null && text !== undefined && text !== '' ? (
      <>
        {text}
        {title.toLowerCase() === 'ketinggian' && ' mdpl'}
        {title.toLowerCase() === 'luas wilayah' && ' m²'}
      </>
    ) : (
      <span className="italic text-muted-foreground">Not set</span>
    );

  return (
    <div className="p-2 bg-background rounded-lg">
      <p className="py-2">{title} :</p>
      <p className="p-4 bg-muted rounded-lg">{formattedValue}</p>
    </div>
  );
};
