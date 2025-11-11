import ContentCard from '../../_component/ContentCard';
import WebProfileForm from '../_component/WebProfileForm';
import { getVillageProfile } from '../_lib/vilageProvile.action';

const WebProfilUpdatePage = async () => {
  const dataVillage = await getVillageProfile();
  // console.log(dataVillage);

  if (!dataVillage) {
    return <div>Info Desa Belum tersedia</div>;
  }
  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1 className="text-xl">Update Profile Desa</h1>
      </ContentCard>
      <ContentCard>
        <WebProfileForm data={dataVillage} />
      </ContentCard>
    </div>
  );
};

export default WebProfilUpdatePage;
