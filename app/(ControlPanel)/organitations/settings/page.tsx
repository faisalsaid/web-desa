import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import StaffPositionTypeForm from '../_components/StaffPositionForm';

export default function SettingsOrganitationsPage() {
  return (
    <div className="space-y-4">
      <ContentCard>
        <h1 className="text-xl font-semibold">Settings Page</h1>
      </ContentCard>
      <ContentCard>
        <div className="sm:grid sm:grid-cols-2 gap-4 p-4">
          <div>List Daftar Jenis Perangkat</div>
          <div>
            <StaffPositionTypeForm />
          </div>
        </div>
      </ContentCard>
    </div>
  );
}
