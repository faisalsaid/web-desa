import { Prisma } from '@prisma/client';

export const getResidentDetailQuery =
  Prisma.validator<Prisma.ResidentFindUniqueArgs>()({});

export type ResidentType = Prisma.ResidentGetPayload<
  typeof getResidentDetailQuery
>;
