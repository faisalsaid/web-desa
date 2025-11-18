import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import FamilyForm from '../../_components/FamilyForm';
import {
  getFamilyDetails,
  getFamilyToUpdate,
} from '../../_lib/families.actions';
import { redirect } from 'next/navigation';
import { FamilyCreateInput, FamilyUpdateInput } from '../../_lib/families.zod';
import { FamilyRelationship } from '@prisma/client';

interface Params {
  familyUrlId: string;
}

interface FamilyUpdateProps {
  params: Promise<Params>;
}

export default async function FamilyUpdatePage({ params }: FamilyUpdateProps) {
  const { familyUrlId } = await params;
  // console.log(familyUrlId);

  const familyDetails = await getFamilyToUpdate(familyUrlId);

  console.log(familyDetails);

  if (!familyDetails) {
    redirect('/404');
  }

  const defaultValues: FamilyUpdateInput = {
    id: familyDetails.id,
    urlId: familyDetails.urlId,
    familyCardNumber: familyDetails.familyCardNumber,
    address: familyDetails.address,
    dusun: familyDetails.dusun,
    rw: familyDetails.rw,
    rt: familyDetails.rt,
    members: familyDetails.members.map((m) => ({
      residentId: m.id,
      fullName: m.fullName,
      nik: m.nik,
      familyRelationship: m.familyRelationship as FamilyRelationship,
    })),
  };

  return (
    <div className="space-y-4">
      <ContentCard>
        <h1 className="text-xl font-semibold">Update Page</h1>
      </ContentCard>

      <ContentCard>
        <FamilyForm mode="edit" defaultValues={defaultValues} />
      </ContentCard>
    </div>
  );
}
