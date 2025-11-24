import { Prisma, RevenueCategory } from '@prisma/client';

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

// export type GetRevenueResult = Prisma.RevenueGetPayload<typeof getRevenueQuery>;

export type GetRevenueResult = {
  id: number;
  urlId: string;
  yearId: number;
  category: RevenueCategory;
  description: string;
  budget: string; // sudah string
  realized: string; // sudah string
  year: {
    id: number;
    year: number;
    isActive: boolean;
  };
};
