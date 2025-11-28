import { CreateImageAssetDto } from '../dto/image-asset.create.dto';
import { SearchImageAssetDto } from '../dto/image-asset.search.dto';
import { UpdateImageAssetDto } from '../dto/image-asset.update.dto';
import { ImageAssetRepository } from '../repository/image-asset.repository';
import { Prisma } from '@prisma/client';

export class ImageAssetService {
  private repo = new ImageAssetRepository();

  async search(params: unknown) {
    const { mimeType, q } = SearchImageAssetDto.parse(params);

    const where: Prisma.ImageAssetWhereInput = {};

    if (mimeType) where.mimeType = mimeType;
    if (q) {
      where.OR = [
        { filename: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ];
    }

    return this.repo.findAll(where);
  }

  async create(dto: unknown) {
    const data = CreateImageAssetDto.parse(dto);
    return this.repo.create(data);
  }

  async update(dto: unknown) {
    const { id, ...rest } = UpdateImageAssetDto.parse(dto);
    return this.repo.update(id, rest);
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  async getAll() {
    return this.repo.findAll();
  }

  async getById(id: string) {
    return this.repo.findById(id);
  }
}
