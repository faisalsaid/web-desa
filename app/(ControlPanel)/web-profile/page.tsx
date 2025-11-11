import React from 'react';
import ContentCard from '../_component/ContentCard';
import TabsProfile from './_component/TabsProfile';
import { getVillageProfile } from './_lib/vilageProvile.action';
import { VillageProfileType } from './_lib/vilageProvile.type';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Edit } from 'lucide-react';

const WebProfilePage = async () => {
  const vilageProfile: VillageProfileType | null = await getVillageProfile();
  const vilageName = vilageProfile?.name;

  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1 className="text-xl">
          Profile Desa : {vilageName ? vilageName : ''}
        </h1>

        <div>
          <Link href={'/web-profile/update'}>
            <Button>
              <Edit /> <span>Edit</span>
            </Button>
          </Link>
        </div>
      </ContentCard>
      <ContentCard>
        <TabsProfile data={vilageProfile} />
      </ContentCard>
    </div>
  );
};

export default WebProfilePage;
