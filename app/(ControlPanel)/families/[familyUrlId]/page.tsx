import { redirect } from 'next/navigation';
import { getFamilyDetails } from '../_lib/families.actions';
import ContentCard from '../../_component/ContentCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SquarePen } from 'lucide-react';
import FamilyDetailsComp from '../_components/FamilyDetailsComp';
import DeleteFamilyButton from '../_components/DeleteFamilyButton';

interface Params {
  familyUrlId: string;
}

interface FamilyDetailProps {
  params: Promise<Params>;
}

const FamilyDetailsPage = async ({ params }: FamilyDetailProps) => {
  const { familyUrlId } = await params;
  // console.log(familyUrlId);

  const familyDetails = await getFamilyDetails(familyUrlId);

  if (!familyDetails) {
    redirect('/404');
  }

  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <div className="font-semibold text-2xl">Detail Keluarga</div>

        <div className="flex items-center gap-4">
          <Link href={`/families/${familyDetails.urlId}/update`}>
            <Button size={'icon'} className="rounded-full">
              <SquarePen />
            </Button>
          </Link>

          <DeleteFamilyButton id={familyDetails.id} />
        </div>
      </ContentCard>
      <FamilyDetailsComp family={familyDetails} />
    </div>
  );
};

export default FamilyDetailsPage;
