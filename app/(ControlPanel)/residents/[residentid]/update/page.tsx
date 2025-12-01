import { notFound } from 'next/navigation';
import { getResidentDetails } from '../../_lib/residents.actions';
import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import ResidentForm from '../../_components/ResidentForm';
import { getImageUrl } from '@/lib/b2storage.action';

interface Params {
  residentid: string;
}

interface ResidentUpdateProps {
  params: Promise<Params>;
}

const UpdateResidentPage = async ({ params }: ResidentUpdateProps) => {
  const { residentid } = await params;
  const residentDetails = await getResidentDetails(residentid);

  if (!residentDetails) notFound();

  const signedUrl = await getImageUrl(residentDetails?.imageKey);

  // 3. Siapkan data untuk Form
  const initialData = {
    ...residentDetails,
    imageUrl: signedUrl, // Kirim URL yang bisa diakses browser
    // Simpan key asli jika perlu logic khusus, tapi biasanya URL saja cukup untuk preview
  };
  return (
    <div className="space-y-4">
      <ContentCard className=" ">
        <div className="flex gap-4 items-center justify-between">
          <h2 className="text-xl font-semibold">Formulir Penduduk</h2>
        </div>
      </ContentCard>
      <ContentCard>
        <ResidentForm resident={initialData} />
      </ContentCard>
    </div>
  );
};

export default UpdateResidentPage;
