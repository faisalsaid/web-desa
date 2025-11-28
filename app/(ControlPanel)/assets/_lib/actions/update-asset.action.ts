'use server';

import { ImageAssetService } from '../service/image-asset.service';

export async function updateAssetAction(data: unknown) {
  const service = new ImageAssetService();
  return service.update(data);
}
