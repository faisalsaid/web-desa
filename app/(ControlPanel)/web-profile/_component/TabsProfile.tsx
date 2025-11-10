'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VillageProfileType } from '../_lib/vilageProvile.type';

const TabsProfile = ({ data }: { data: VillageProfileType | null }) => {
  return (
    <Tabs defaultValue="general" className="">
      <TabsList className="gap-4">
        <TabsTrigger className="hover:cursor-pointer" value="general">
          General
        </TabsTrigger>
        <TabsTrigger className="hover:cursor-pointer" value="visi-misi">
          Visi Misi
        </TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <div className="space-y-2 sm:grid sm:grid-cols-3 gap-4">
          <ProfileCard title={'Nama Desa'} text={data?.name} />
          <ProfileCard title="Deskripsi" text={data?.description} />
        </div>
      </TabsContent>
      <TabsContent value="visi-misi">
        <div className="space-y-2 sm:grid sm:grid-cols-2 gap-4">
          <ProfileCard title="Visi" text={data?.vision} />
          <ProfileCard title="Misi" text={data?.mission} />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TabsProfile;

interface ProfileCardProps {
  title: string;
  text: string | undefined | null;
}

const ProfileCard = ({ title, text }: ProfileCardProps) => {
  return (
    <div className="p-2 bg-background rounded-lg">
      <p className="py-2">{title} :</p>
      <p className="p-4 bg-muted rounded-lg">
        {text ? (
          text
        ) : (
          <span className="italic text-muted-foreground">Not set</span>
        )}
      </p>
    </div>
  );
};
