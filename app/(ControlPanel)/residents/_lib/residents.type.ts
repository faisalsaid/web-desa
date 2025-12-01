import { Prisma } from '@prisma/client';
import { scheduler } from 'timers/promises';

export const getResidentDetailQuery =
  Prisma.validator<Prisma.ResidentFindUniqueArgs>()({});

export type ResidentType = Prisma.ResidentGetPayload<
  typeof getResidentDetailQuery
>;
