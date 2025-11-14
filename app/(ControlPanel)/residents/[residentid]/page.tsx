import { redirect } from 'next/navigation';
import { getResidentDetails } from '../_lib/residents.actions';
import ContentCard from '../../_component/ContentCard';
import ResidentDetails from '../_components/ResidentDetails';
import { Button } from '@/components/ui/button';
import { SquarePen, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Params {
  residentid: string;
}

interface ResidentDetails {
  params: Promise<Params>;
}

const ResidentDetailPage = async ({ params }: ResidentDetails) => {
  const { residentid } = await params;

  // console.log(residentid);
  const residentDetails = await getResidentDetails(residentid);

  if (!residentDetails) {
    redirect('/404');
  }

  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <div className="font-semibold text-2xl">Profil Warga</div>

        <div className="flex items-center gap-4">
          <Link href={`/residents/${residentDetails.urlId}/update`}>
            <Button size={'icon'} className="rounded-full">
              <SquarePen />
            </Button>
          </Link>
          <Button size={'icon'} className="rounded-full">
            <Trash2 />
          </Button>
        </div>
      </ContentCard>
      <ResidentDetails resident={residentDetails} />
    </div>
  );
};

export default ResidentDetailPage;
