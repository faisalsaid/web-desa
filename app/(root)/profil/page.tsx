import { notFound } from 'next/navigation';
import VillageProfilePagePublic from './_components/VillageProfilePagePublic';
import { getVillageProfil } from './_lib/actions/getConfigVilage';

export async function generateMetadata() {
  const data = await getVillageProfil();
  const name = data?.villageName || 'Contoh Desa';

  const ogImage = '/img/og-image.jpg';

  return {
    title: `Profil Desa ${name}`,
    description: `Informasi lengkap tentang profil Desa ${name}.`,

    openGraph: {
      title: `Profil Desa ${name}`,
      description: `Informasi lengkap tentang profil Desa ${name}.`,
      url: '/profil',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: `Profil Desa ${name}`,
      description: `Informasi lengkap tentang profil Desa ${name}.`,
      images: [ogImage],
    },
  };
}

export default async function ProfilPage() {
  const villageProfile = await getVillageProfil();

  if (!villageProfile) notFound();

  return (
    <div className="space-y-4">
      <VillageProfilePagePublic villageData={villageProfile} />
    </div>
  );
}
