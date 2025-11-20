import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import { getAllStaffPositionsTypes } from '../_lib/organitatons.action';
import StaffPositionsList from '../_components/StaffPositionsList';

export default async function SettingsOrganitationsPage() {
  const staffPossitons = await getAllStaffPositionsTypes();

  console.log(staffPossitons);

  // console.log(staffPossitons);

  return (
    <div className="space-y-4">
      <ContentCard>
        <h1 className="text-xl font-semibold">Settings Page</h1>
      </ContentCard>

      <div className="sm:grid sm:grid-cols-2 gap-4 ">
        <ContentCard>
          <StaffPositionsList staffPositions={staffPossitons} />
        </ContentCard>

        {/* <div>
            <
          </div>
          <div>
            <StaffPositionTypeForm />
          </div> */}
      </div>
    </div>
  );
}
