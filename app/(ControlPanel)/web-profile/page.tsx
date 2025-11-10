import React from 'react';
import ContentCard from '../_component/ContentCard';
import TabsProfile from './_component/TabsProfile';
import prisma from '@/lib/prisma';
import { getVillageProfile } from './_lib/vilageProvile.action';
import { VillageProfileType } from './_lib/vilageProvile.type';

const WebProfilePage = async () => {
  const vilageProfile: VillageProfileType | null = await getVillageProfile();
  const vilageName = vilageProfile?.name;

  return (
    <div className="space-y-4">
      <ContentCard>
        <h1 className="text-2xl">
          Profile Desa : {vilageName ? vilageName : ''}
        </h1>
      </ContentCard>
      <ContentCard>
        <TabsProfile data={vilageProfile} />
      </ContentCard>
    </div>
  );
};

export default WebProfilePage;
