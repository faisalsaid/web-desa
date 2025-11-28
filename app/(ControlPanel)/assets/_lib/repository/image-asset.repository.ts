import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { ImageAssetEntity } from '../domain/image-asset.entity';
import { IImageAssetRepository } from './image-asset.repository.interface';

export class ImageAssetRepository implements IImageAssetRepository {
  #map(row: any): ImageAssetEntity {
    return new ImageAssetEntity(
      row.id,
      row.bucketKey,
      row.url,
      row.filename,
      row.mimeType,
      row.size,
      row.width,
      row.height,
      row.alt,
      row.description,
      row.variants,
      row.createdAt,
      row.updatedAt,
    );
  }

  async findAll(where?: Prisma.ImageAssetWhereInput) {
    const rows = await prisma.imageAsset.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return rows.map(this.#map);
  }

  async findById(id: string) {
    const row = await prisma.imageAsset.findUnique({ where: { id } });
    return row ? this.#map(row) : null;
  }

  async create(data: Prisma.ImageAssetCreateInput) {
    const row = await prisma.imageAsset.create({ data });
    return this.#map(row);
  }

  async update(id: string, data: Prisma.ImageAssetUpdateInput) {
    const row = await prisma.imageAsset.update({
      where: { id },
      data,
    });
    return this.#map(row);
  }

  async delete(id: string) {
    await prisma.imageAsset.delete({ where: { id } });
  }
}
