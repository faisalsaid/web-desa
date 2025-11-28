import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';

import AddImageDialog from './_components/AddImageDialog';
import { getImageUrlAction, uploadFileAction } from './_lib/storage.action';
import { getAllAssetsAction } from './_lib/actions/get-all-assets.action';
import { getSignedUrlAction } from './_lib/actions/get-signed-url.action';
import ImageListComp from './_components/ImageListComp';
import { ImageAssetDTO } from './_lib/types/image-asset.dto';

export default async function AssetsPage() {
  const assets = await getAllAssetsAction();

  // generate signed URL untuk semua asset
  const signed = await Promise.all(
    assets.map(async (a) => {
      const url = await getSignedUrlAction(a.id);

      return {
        id: a.id,
        filename: a.filename,
        alt: a.alt ?? null, // ← FIX WAJIB
        signedUrl: url.url,
      } satisfies ImageAssetDTO; // optional but recommended
    }),
  );

  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Assets Page</h1>
        <AddImageDialog action={uploadFileAction} />
      </ContentCard>
      <ContentCard>
        <ImageListComp assets={signed} />
      </ContentCard>
    </div>
  );
}
