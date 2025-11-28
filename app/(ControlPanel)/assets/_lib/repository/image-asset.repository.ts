import prisma from '@/lib/prisma';
import { ImageAsset, Prisma } from '@prisma/client';
import { ImageAssetEntity } from '../domain/image-asset.entity';
import { IImageAssetRepository } from './image-asset.repository.interface';
import { ImageVariants } from '../types/image-asset.dto';

export class ImageAssetRepository implements IImageAssetRepository {
  private map(row: ImageAsset): ImageAssetEntity {
    // convert variants (JsonValue | null) to ImageVariants | null
    let variants: ImageVariants | null = null;

    if (
      row.variants &&
      typeof row.variants === 'object' &&
      !Array.isArray(row.variants)
    ) {
      variants = {};
      for (const [k, v] of Object.entries(row.variants)) {
        if (typeof v === 'string') variants[k] = v;
      }
      if (!Object.keys(variants).length) variants = null;
    }

    return new ImageAssetEntity(
      row.id,
      row.bucketKey,
      row.url,
      row.filename,
      row.mimeType,
      row.size,
      row.width ?? null,
      row.height ?? null,
      row.alt ?? null,
      row.description ?? null,
      variants,
      row.createdAt,
      row.updatedAt,
    );
  }

  async findAll(where?: Prisma.ImageAssetWhereInput) {
    const rows = await prisma.imageAsset.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return rows.map((r) => this.map(r));
  }

  async findById(id: string) {
    const row = await prisma.imageAsset.findUnique({ where: { id } });
    return row ? this.map(row) : null;
  }

  async create(data: Prisma.ImageAssetCreateInput) {
    const row = await prisma.imageAsset.create({ data });
    return this.map(row);
  }

  async update(id: string, data: Prisma.ImageAssetUpdateInput) {
    const row = await prisma.imageAsset.update({
      where: { id },
      data,
    });
    return this.map(row);
  }

  async delete(id: string) {
    await prisma.imageAsset.delete({ where: { id } });
  }
}
