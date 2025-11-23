import { Prisma } from '@prisma/client';

export const getBudgetYearQuery =
  Prisma.validator<Prisma.BudgetYearDefaultArgs>()({
    select: {
      id: true,
      year: true,
      isActive: true,
      isLocked: true,
      isFinalized: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      revenues: true,
      expenses: true,
      financing: true,
    },
  });

// Auto-infer the return type (very useful for Server Actions!)
export type GetBudgetYearResult = Prisma.BudgetYearGetPayload<
  typeof getBudgetYearQuery
>;
