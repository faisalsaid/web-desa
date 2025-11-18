import { Prisma } from '@prisma/client';

export const getFamilyDetailsQuery =
  Prisma.validator<Prisma.FamilyFindFirstArgs>()({
    include: {
      headOfFamily: true,
      members: true,
    },
  });

export type FamilyType = Prisma.FamilyGetPayload<typeof getFamilyDetailsQuery>;

export const getFamilyToUpdateQuery =
  Prisma.validator<Prisma.FamilyFindFirstArgs>()({
    select: {
      id: true,
      urlId: true,
      familyCardNumber: true,
      address: true,
      dusun: true,
      rw: true,
      rt: true,
      members: {
        select: {
          id: true,
          nik: true,
          fullName: true,
          familyRelationship: true,
        },
      },
    },
  });
export type FamilyToUpdateType = Prisma.FamilyGetPayload<
  typeof getFamilyToUpdateQuery
>;
