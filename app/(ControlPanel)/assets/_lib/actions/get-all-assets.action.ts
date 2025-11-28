'use server';

import { ImageAssetService } from '../service/image-asset.service';

export async function getAllAssetsAction() {
  const service = new ImageAssetService();
  return service.getAll();
}
