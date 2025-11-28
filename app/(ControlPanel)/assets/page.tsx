import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';

import AddImageDialog from './_components/AddImageDialog';
import { uploadFileAction } from './_lib/storage.action';

export default function AssetsPage() {
  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Assets Page</h1>
        <AddImageDialog action={uploadFileAction} />
      </ContentCard>
    </div>
  );
}
