import { Prisma } from '@prisma/client';

export const getExpenseQuery = Prisma.validator<Prisma.ExpenseFindManyArgs>()({
  select: {
    id: true,
    urlId: true,
    yearId: true,
    sector: true,
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

export type GetExpenseResult = Prisma.ExpenseGetPayload<typeof getExpenseQuery>;
