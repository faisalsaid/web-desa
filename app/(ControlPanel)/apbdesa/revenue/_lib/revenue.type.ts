import { Prisma } from '@prisma/client';

export const getRevenueQuery = Prisma.validator<Prisma.RevenueDefaultArgs>()({
  select: {
    id: true,
    urlId: true,
    yearId: true,
    category: true,
    description: true,
    budget: true,
    realized: true,
    year: {
      select: {
        id: true,
        year: true,
        isActive: true,
      },
    },
  },
});

export type GetRevenueResult = Prisma.RevenueGetPayload<typeof getRevenueQuery>;
