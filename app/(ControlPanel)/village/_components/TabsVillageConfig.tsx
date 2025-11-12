'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VillageConfigType } from '../_lib/villageConfig.type';
import Image from 'next/image';

const TabsVillageConfig = ({ data }: { data: VillageConfigType | null }) => {
  return (
    <Tabs defaultValue="general">
      <div className="overflow-x-auto whitespace-nowrap flex no-scrollbar pb-3">
        <TabsList className="gap-4 ">
          <TabsTrigger className="hover:cursor-pointer" value="general">
            Umum
          </TabsTrigger>
          <TabsTrigger className="hover:cursor-pointer" value="identity">
            Identitias
          </TabsTrigger>
          <TabsTrigger className="hover:cursor-pointer" value="geo">
            Geografi
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="general">
        <div className="space-y-2">
          <ProfileCard title="No Id" text={data?.villageCode} />
          <ProfileCard title="Nama" text={data?.villageName} />
          <ProfileCard title="Id Kecamatan" text={data?.districtCode} />
          <ProfileCard title="Kecamatan" text={data?.districtName} />
          <ProfileCard title="Id Kabupaten" text={data?.regencyCode} />
          <ProfileCard title="Kabupaten" text={data?.regencyName} />
          <ProfileCard title="Id Propinsi" text={data?.provinceCode} />
          <ProfileCard title="Propinsi" text={data?.provinceName} />
          <ProfileCard title="Alamat Kantor" text={data?.officeAddress} />
          <ProfileCard title="Kode Post" text={data?.postalCode} />
          <ProfileCard title="No Telephone" text={data?.phone} />
          <ProfileCard title="Email" text={data?.email} />
          <ProfileCard title="Website" text={data?.website} />
          <ProfileCard title="Tahun Berdiri" text={data?.establishedYear} />
        </div>
      </TabsContent>
      <TabsContent value="identity">
        <div className="space-y-2">
          <div className="p-2 bg-background rounded-lg">
            <p className="py-2">Logo :</p>
            <div className="p-4 bg-muted rounded-lg flex items-center justify-center relative">
              <Image
                // className="bg-white rounded-full"
                src={data?.logoUrl ? data.logoUrl : '/img/logo-desa-dummy.png'}
                alt="Logo Desa Torino"
                width={200}
                height={200}
              />
              {/* <div className="absolute bottom-2 right-2">
                              <LogoForm />
                            </div> */}
            </div>
            <div className="p-2 bg-background rounded-lg">
              <p className="py-2">Foto Kantor :</p>
              <div className="p-4 bg-muted rounded-lg flex items-center justify-center relative">
                <Image
                  // className="bg-white rounded-full"
                  src={
                    data?.logoUrl ? data.logoUrl : '/img/logo-desa-dummy.png'
                  }
                  alt="Logo Desa Torino"
                  width={200}
                  height={200}
                />
                {/* <div className="absolute bottom-2 right-2">
                              <LogoForm />
                            </div> */}
              </div>
            </div>
          </div>
          <ProfileCard title="Slogan" text={data?.slogan} />
          <ProfileCard title="Visi" text={data?.vision} />
          <ProfileCard title="Misi" text={data?.mission} />
          <ProfileCard title="Deskripsi" text={data?.description} />
        </div>
      </TabsContent>
      <TabsContent value="geo">
        <div className="space-y-2">
          <ProfileCard title="Luas Wilayah" text={data?.areaSize} />
          <ProfileCard title="Jumlah Penduduk" text={data?.populationTotal} />
          <ProfileCard title="Jumlah Dusun" text={data?.hamletCount} />
          <ProfileCard title="Jumlah RW" text={data?.rwCount} />
          <ProfileCard title="Jumlah RT" text={data?.rtCount} />
          <ProfileCard title="Batas Utara" text={data?.borderNorth} />
          <ProfileCard title="Batas Timur" text={data?.borderEast} />
          <ProfileCard title="Batas Selatan" text={data?.borderSouth} />
          <ProfileCard title="Batas Barat" text={data?.borderWest} />
          <ProfileCard title="Ketinggian" text={data?.elevation} />
          <ProfileCard
            title="Latitude"
            text={data?.latitude ? Number(data.latitude.toString()) : undefined}
          />
          <ProfileCard
            title="Longtititude"
            text={
              data?.longitude ? Number(data.longitude.toString()) : undefined
            }
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TabsVillageConfig;

interface ProfileCardProps {
  title: string;
  text: string | number | undefined | null;
}

const ProfileCard = ({ title, text }: ProfileCardProps) => {
  const formattedValue =
    text !== null && text !== undefined && text !== '' ? (
      <>
        {text}
        {title.toLowerCase() === 'ketinggian' && ' mdpl'}
        {title.toLowerCase() === 'luas wilayah' && ' km²'}
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
