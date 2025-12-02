'use server';
import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import { getStaffDetails } from '../_lib/staff.actions';
import { redirect } from 'next/navigation';
import StaffDetailsComp from '../_components/StaffDetailsComp';
import ResidentDetailView from '../../../residents/_components/ResidentDetailView';
import UpdatePerangkatButton from '../../_components/UpdatePerangkatButton';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getImageUrl } from '@/lib/b2storage.action';
import { TStaff } from '../_lib/staff.type';
import { Resident } from '@prisma/client';

interface Params {
  staffId: string;
}

interface Props {
  params: Promise<Params>;
}

const StaffDetailPage = async ({ params }: Props) => {
  const { staffId } = await params;

  // console.log(staffId);

  const staffDetail = await getStaffDetails(staffId);

  const resident = staffDetail.data?.resident;
  let imageUrl = null;

  if (resident?.imageKey) {
    imageUrl = await getImageUrl(resident.imageKey);
  }
  // console.log(imageUrl);

  const result = {
    ...staffDetail,
    data: {
      ...staffDetail.data,
      resident: resident
        ? {
            ...resident,
            imageUrl,
          }
        : null,
    },
  };

  if (!staffDetail.success) {
    redirect('/404');
  }

  return (
    <div className="space-y-4">
      <ContentCard className="flex gap-4 items-center justify-between">
        <h1 className="text-xl font-semibold">Perangkat desa</h1>
        <UpdatePerangkatButton staffId={staffDetail.data?.id as number} />
      </ContentCard>
      <div className="grid gap-4 lg:grid-cols-3">
        <StaffDetailsComp staff={result.data as TStaff} />
        <div className="lg:col-span-2 space-y-4">
          <p className="text-lg font-semibold text-muted-foreground">
            Detail Warga
          </p>
          {staffDetail.data?.resident?.id ? (
            <ResidentDetailView resident={result.data.resident as Resident} />
          ) : (
            <div className="flex items-center justify-center border-2 rounded-xl h-24 border-dashed p-4 text-center text-muted-foreground">
              Data resident belum dibuat atau belum ditautkan
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffDetailPage;
