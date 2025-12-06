import SingleVillageIdm from '@/app/(ControlPanel)/idm/_components/IdmReportDashboard';
import { getVillageProfil } from '../profil/_lib/actions/getConfigVilage';

export async function generateMetadata() {
  const data = await getVillageProfil();
  const name = data?.villageName || 'Contoh Desa';

  const title = `Indeks Desa Membangun, Desa ${name}`;
  const desc = `Informasi lengkap tentang indeks desa membangun (IDM) ${name}.`;

  const ogImage = '/img/og-image.jpg';

  return {
    title: title,
    description: desc,

    openGraph: {
      title: `Profil Desa ${name}`,
      description: desc,
      url: '/idm-info',
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
      title: title,
      description: desc,
      images: [ogImage],
    },
  };
}

export default function IdmInfoPage() {
  return (
    <div className="space-y-4">
      <SingleVillageIdm />
    </div>
  );
}
