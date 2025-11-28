import prisma from '@/lib/prisma';
import { ImageAssetListItem, imageAssetSelect } from './assets.type';
import { Prisma } from '@prisma/client';

export interface GetAllAssetParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'createdAt' | 'filename';
  order?: 'asc' | 'desc';
}

export interface GetAllAssetResult {
  items: ImageAssetListItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export async function getAllAssetsQuery(
  params: GetAllAssetParams = {},
): Promise<GetAllAssetResult> {
  const {
    page = 1,
    limit = 20,
    search,
    sortBy = 'createdAt',
    order = 'desc',
  } = params;

  const skip = (page - 1) * limit;

  const where: Prisma.ImageAssetWhereInput | undefined = search
    ? {
        OR: [
          {
            filename: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            alt: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            description: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      }
    : undefined;

  const [items, total] = await Promise.all([
    prisma.imageAsset.findMany({
      select: imageAssetSelect,
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: order },
    }),
    prisma.imageAsset.count({ where }),
  ]);

  return {
    items,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
}
