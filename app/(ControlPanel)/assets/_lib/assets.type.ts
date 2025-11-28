import { Prisma } from '@prisma/client';

export const imageAssetSelect = Prisma.validator<Prisma.ImageAssetSelect>()({
  id: true,
  bucketKey: true,
  url: true,
  filename: true,
  mimeType: true,
  size: true,
  width: true,
  height: true,
  alt: true,
  description: true,
  variants: true,
  createdAt: true,
  updatedAt: true,
});

export type ImageAssetListItem = Prisma.ImageAssetGetPayload<{
  select: typeof imageAssetSelect;
}>;
