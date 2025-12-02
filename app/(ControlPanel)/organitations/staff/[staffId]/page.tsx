'use server';
import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import { getStaffDetails } from '../_lib/staff.actions';
import { redirect } from 'next/navigation';
import StaffDetailsComp from '../_components/StaffDetailsComp';
import ResidentDetailView from '../../../residents/_components/ResidentDetailView';
import UpdatePerangkatButton from '../../_components/UpdatePerangkatButton';

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
        <StaffDetailsComp staff={staffDetail.data!} />
        <div className="lg:col-span-2 space-y-4">
          <ContentCard>Detail Warga</ContentCard>
          {staffDetail.data?.resident?.id ? (
            <ResidentDetailView />
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
