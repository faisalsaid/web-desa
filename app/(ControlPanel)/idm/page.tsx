import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import IdmReportDashboard from './_components/IdmReportDashboard';

export default function IdmPage() {
  return (
    <div className="space-y-4">
      <ContentCard>
        <h1 className="text-xl font-semibold">Idm Page</h1>
      </ContentCard>

      <ContentCard>
        <IdmReportDashboard />
      </ContentCard>
    </div>
  );
}
