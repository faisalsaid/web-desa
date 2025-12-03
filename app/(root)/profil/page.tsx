import { notFound } from 'next/navigation';
import VillageProfilePagePublic from './_components/VillageProfilePagePublic';
import { getVillageProfil } from './_lib/actions/getConfigVilage';

export default async function ProfilPage() {
  const villageProfile = await getVillageProfil();

  if (!villageProfile) notFound();

  return (
    <div className="space-y-4">
      <VillageProfilePagePublic villageData={villageProfile} />
    </div>
  );
}
