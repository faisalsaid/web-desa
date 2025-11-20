import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import { getAllStaffPositionsTypes } from '../_lib/organitatons.action';
import StaffPositionsList from '../_components/StaffPositionsList';
import { getCurrentUser } from '@/app/_lib/root.action';

export default async function SettingsOrganitationsPage() {
  const staffPossitons = await getAllStaffPositionsTypes();

  const curentUser = await getCurrentUser();

  console.log(curentUser);

  return (
    <div className="space-y-4">
      <ContentCard>
        <h1 className="text-xl font-semibold">Settings Page</h1>
      </ContentCard>

      <div className="sm:grid sm:grid-cols-2 gap-4 ">
        <ContentCard>
          <StaffPositionsList staffPositions={staffPossitons} />
        </ContentCard>
      </div>
    </div>
  );
}
