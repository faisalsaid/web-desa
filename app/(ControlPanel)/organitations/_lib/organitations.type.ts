import { Prisma } from '@prisma/client';

export const getStaffPositionTypeDetailQuery =
  Prisma.validator<Prisma.StaffPositionFindManyArgs>()({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
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
