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

// APBDESA SUMMARY

export const GetBugetYearReportQuery =
  Prisma.validator<Prisma.BudgetYearDefaultArgs>()({
    include: {
      expenses: {
        where: {
          deletedAt: null,
        },
      },
      revenues: {
        where: {
          deletedAt: null,
        },
      },
      financing: {
        where: {
          deletedAt: null,
        },
      },
    },
  });

export type GetBugetYearReport = Prisma.BudgetYearGetPayload<
  typeof GetBugetYearReportQuery
>;

export interface APBTransactionItem {
  id: number;
  urlId: string;
  type: 'Pendapatan' | 'Belanja' | 'Pembiayaan';
  categoryOrSector: string;
  description: string;
  amount: number;
  createdAt: Date;
}
