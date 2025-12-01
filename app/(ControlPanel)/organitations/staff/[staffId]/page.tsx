'use server';
import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import { getStaffDetails } from '../_lib/staff.actions';
import { redirect } from 'next/navigation';
// import StaffDetailsComp from '../_components/StaffDetailsComp';

interface Params {
  staffId: string;
}

interface Props {
  params: Promise<Params>;
}

const StaffDetailPage = async ({ params }: Props) => {
  const { staffId } = await params;

  console.log(staffId);

  // const staffDetail = await getStaffDetails(staffId);

  // if (!staffDetail.success) {
  //   redirect('/404');
  // }

  return (
    <div className="space-y-4">
      <ContentCard className="flex gap-4 items-center justify-between">
        <h1 className="text-xl font-semibold">Perangkat desa</h1>
      </ContentCard>
      <div className="grid gap-4">
        <ContentCard>
          {/* <StaffDetailsComp staff={staffDetail.data!} /> */}
        </ContentCard>
        <ContentCard>kiri</ContentCard>
      </div>
    </div>
  );
};

export default StaffDetailPage;
