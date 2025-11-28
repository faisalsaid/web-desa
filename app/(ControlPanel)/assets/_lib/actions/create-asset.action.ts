'use server';

import { ImageAssetService } from '../service/image-asset.service';

export async function createAssetAction(data: unknown) {
  const service = new ImageAssetService();
  return service.create(data);
}
