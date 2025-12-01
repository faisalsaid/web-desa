import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';

const StaffDetailPage = () => {
  return (
    <div className="space-y-4">
      <ContentCard className="flex gap-4 items-center justify-between">
        <h1 className="text-xl font-semibold">Perangkat desa</h1>
      </ContentCard>
      <div className="grid gap-4">
        <ContentCard>left</ContentCard>
        <ContentCard>kiri</ContentCard>
      </div>
    </div>
  );
};

export default StaffDetailPage;
