import { redirect } from 'next/navigation';
import { getResidentDetails } from '../../_lib/residents.actions';
import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import ResidentForm from '../../_components/ResidentForm';

interface Params {
  residentid: string;
}

interface ResidentUpdateProps {
  params: Promise<Params>;
}

const UpdateResidentPage = async ({ params }: ResidentUpdateProps) => {
  const { residentid } = await params;
  const residentDetails = await getResidentDetails(residentid);

  if (!residentDetails) {
    redirect('/404');
  }
  return (
    <div className="space-y-4">
      <ContentCard className=" ">
        <div className="flex gap-4 items-center justify-between">
          <h2 className="text-xl font-semibold">Formulir Penduduk</h2>
        </div>
      </ContentCard>
      <ContentCard>
        <ResidentForm resident={residentDetails} />
      </ContentCard>
    </div>
  );
};

export default UpdateResidentPage;
