import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';

import AddImageDialog from './_components/AddImageDialog';

export default function AssetsPage() {
  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Assets Page</h1>
        <AddImageDialog />
      </ContentCard>
    </div>
  );
}
