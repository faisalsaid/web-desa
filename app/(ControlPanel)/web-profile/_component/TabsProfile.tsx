'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TabsProfile = () => {
  return (
    <Tabs defaultValue="general" className="w-[400px]">
      <TabsList className="gap-4">
        <TabsTrigger className="hover:cursor-pointer" value="general">
          General
        </TabsTrigger>
        <TabsTrigger className="hover:cursor-pointer" value="visi-misi">
          Visi Misi
        </TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="visi-misi">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default TabsProfile;
