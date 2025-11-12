import ContentCard from '../../_component/ContentCard';
import VillageConfigForm from '../_components/VillageConfigForm';
import { getVillageConfig } from '../_lib/villageConfig.actions';
import { VillageConfigType } from '../_lib/villageConfig.type';

const VillageUpdatePage = async () => {
  const villageConfig: VillageConfigType | null = await getVillageConfig();
  if (!villageConfig) {
    return <div>Info Desa Belum tersedia</div>;
  }
  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1 className="text-xl">Update Profil Desa</h1>
      </ContentCard>
      <ContentCard>
        <VillageConfigForm />
      </ContentCard>
    </div>
  );
};

export default VillageUpdatePage;
