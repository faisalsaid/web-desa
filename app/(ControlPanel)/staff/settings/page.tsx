import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import StaffPositionComp from '../_components/StaffPositionComp';

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <ContentCard>
        <h1 className="text-xl font-semibold">Pengaturan perangkat desa</h1>
      </ContentCard>
      <ContentCard>
        <StaffPositionComp />
      </ContentCard>
    </div>
  );
}
