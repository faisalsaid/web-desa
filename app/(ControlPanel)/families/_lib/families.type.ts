import { Prisma } from '@prisma/client';
import { tree } from 'next/dist/build/templates/app-page';
import { tr } from 'zod/v4/locales';

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

export const getFamiliesDataTableQuery =
  Prisma.validator<Prisma.FamilyFindManyArgs>()({
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
      headOfFamily: {
        select: {
          id: true,
          fullName: true,
        },
      },
    },
  });

export type FamiliesDataTableType = Prisma.FamilyGetPayload<
  typeof getFamiliesDataTableQuery
>;
