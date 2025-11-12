import ContentCard from '../_component/ContentCard';
import { VillageConfigType } from './_lib/villageConfig.type';
import { getVillageConfig } from './_lib/villageConfig.actions';
import TabsVillageConfig from './_components/TabsVillageConfig';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

const VillagePage = async () => {
  const villageConfig: VillageConfigType | null = await getVillageConfig();
  const vilageName = villageConfig?.villageName;
  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1 className="text-xl">
          Profile Desa : {vilageName ? vilageName : ''}
        </h1>

        <div>
          <Link href={'/village/update'}>
            <Button>
              <Edit /> <span>Edit</span>
            </Button>
          </Link>
        </div>
      </ContentCard>
      <ContentCard>
        <TabsVillageConfig data={villageConfig} />
      </ContentCard>
    </div>
  );
};

export default VillagePage;
