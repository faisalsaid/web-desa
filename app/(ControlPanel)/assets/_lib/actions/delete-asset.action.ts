'use server';

import { ImageAssetService } from '../service/image-asset.service';

export async function deleteAssetAction(id: string) {
  const service = new ImageAssetService();
  return service.delete(id);
}
