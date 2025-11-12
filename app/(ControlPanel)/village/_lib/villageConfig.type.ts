import { Prisma } from '@prisma/client';

export const getVillageConfigQuery =
  Prisma.validator<Prisma.VillageConfigFindFirstArgs>()({});

export type VillageConfigType = Prisma.VillageConfigGetPayload<
  typeof getVillageConfigQuery
>;
