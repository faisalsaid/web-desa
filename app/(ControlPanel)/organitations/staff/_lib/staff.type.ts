import { Prisma } from '@prisma/client';

export const GetStaffQuery = Prisma.validator<Prisma.StaffFindFirstArgs>()({
  include: {
    resident: true,
  },
});

export type TStaff = Prisma.StaffGetPayload<typeof GetStaffQuery>;
