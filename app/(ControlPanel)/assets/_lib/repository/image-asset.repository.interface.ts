import { Prisma } from '@prisma/client';
import { ImageAssetEntity } from '../domain/image-asset.entity';

export interface IImageAssetRepository {
  findAll(where?: Prisma.ImageAssetWhereInput): Promise<ImageAssetEntity[]>;
  findById(id: string): Promise<ImageAssetEntity | null>;
  create(data: Prisma.ImageAssetCreateInput): Promise<ImageAssetEntity>;
  update(
    id: string,
    data: Prisma.ImageAssetUpdateInput,
  ): Promise<ImageAssetEntity>;
  delete(id: string): Promise<void>;
}
