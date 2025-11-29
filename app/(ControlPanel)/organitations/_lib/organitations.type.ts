import { Prisma } from '@prisma/client';

export const getStaffPositionTypeDetailQuery =
  Prisma.validator<Prisma.StaffPositionFindManyArgs>()({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      isUnique: true,
      positionType: true,
      createdAt: true,
      updatedAt: true,
      staffAssignments: {
        select: {
          id: true,
        },
      },
    },
  });

export type StaffPositionType = Prisma.StaffPositionGetPayload<
  typeof getStaffPositionTypeDetailQuery
>;

export const getStaffDetailsQuery =
  Prisma.validator<Prisma.StaffFindManyArgs>()({
    include: {
      resident: {
        select: {
          id: true,
          fullName: true,
        },
      },
      positionType: {
        select: {
          id: true,
          slug: true,
          name: true,
        },
      },
    },
  });

export type StaffType = Prisma.StaffGetPayload<typeof getStaffDetailsQuery>;
