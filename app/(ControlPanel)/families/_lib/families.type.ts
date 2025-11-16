import { Prisma } from '@prisma/client';

export const getFamilyDetailsQuery =
  Prisma.validator<Prisma.FamilyFindFirstArgs>()({
    include: {
      headOfFamily: true,
      members: true,
    },
  });

export type FamilyType = Prisma.FamilyGetPayload<typeof getFamilyDetailsQuery>;
