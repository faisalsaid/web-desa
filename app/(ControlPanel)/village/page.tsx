import { VillageConfig } from '@prisma/client';
import ContentCard from '../_component/ContentCard';
import { VillageConfigType } from './_lib/villageConfig.type';
import { getVillageConfig } from './_lib/villageConfig.actions';

const VillagePage = async () => {
  const vilageProfile: VillageConfigType | null = await getVillageConfig();
  const vilageName = vilageProfile?.villageName;
  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1 className="text-xl">
          Profile Desa : {vilageName ? vilageName : ''}
        </h1>

        {/* <div>
          <Link href={'/web-profile/update'}>
            <Button>
              <Edit /> <span>Edit</span>
            </Button>
          </Link>
        </div> */}
      </ContentCard>
      <ContentCard>{/* <TabsProfile data={vilageProfile} /> */}</ContentCard>
    </div>
  );
};

export default VillagePage;
