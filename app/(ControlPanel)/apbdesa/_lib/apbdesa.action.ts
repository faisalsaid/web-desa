'use server';

import prisma from '@/lib/prisma';
import {
  APBTransactionItem,
  getBudgetYearQuery,
  GetBudgetYearResult,
  GetBugetYearReport,
  GetBugetYearReportQuery,
} from './apbdesa.type';
import z, { number } from 'zod';
import {
  BudgetYearCreateSchema,
  BudgetYearDeleteSchema,
  BudgetYearUpdateSchema,
} from './apbdesa.zod';
import { Prisma } from '@prisma/client';
import {
  sanitizeBudgetYearReport,
  SanitizedBudgetYearReport,
} from './helper/sanitizeBudgetYearReport';

// CREATE
export async function createBudgetYear(
  input: z.infer<typeof BudgetYearCreateSchema>,
): Promise<GetBudgetYearResult> {
  const data = BudgetYearCreateSchema.parse(input);

  return prisma.budgetYear.create({
    data,
    ...getBudgetYearQuery,
  });
}

// READ BY ID
export async function getBudgetYear(
  id: number,
): Promise<GetBudgetYearResult | null> {
  return prisma.budgetYear.findUnique({
    where: { id },
    ...getBudgetYearQuery,
  });
}

// READ ALL
export async function getBudgetYears(): Promise<GetBudgetYearResult[]> {
  return prisma.budgetYear.findMany({
    orderBy: { year: 'desc' },
    ...getBudgetYearQuery,
  });
}

// READ ALL for OPTIONS
export async function getBudgetYearsOptions(): Promise<
  {
    id: number;
    year: number;
  }[]
> {
  return prisma.budgetYear.findMany({
    orderBy: { year: 'desc' },
    select: {
      id: true,
      year: true,
    },
  });
}

// UPDATE
export async function updateBudgetYear(
  input: z.infer<typeof BudgetYearUpdateSchema>,
): Promise<GetBudgetYearResult> {
  const data = BudgetYearUpdateSchema.parse(input);

  return prisma.budgetYear.update({
    where: { id: data.id },
    data,
    ...getBudgetYearQuery,
  });
}

// SOFT DELETE (deletedAt)
export async function deleteBudgetYear(
  input: z.infer<typeof BudgetYearDeleteSchema>,
): Promise<GetBudgetYearResult> {
  const { id } = BudgetYearDeleteSchema.parse(input);

  return prisma.budgetYear.update({
    where: { id },
    data: { deletedAt: new Date() },
    ...getBudgetYearQuery,
  });
}

// interface GetBugetYearReportProps {
//   year?: number
// }

// export const getBugetYearReport = async (
//   id?: number,
// ): Promise<GetBugetYearReport[]> => {
//   const where: Prisma.BudgetYearWhereInput = {
//     deletedAt: null,
//   };

//   if (id) {
//     where.id = id;
//   }
//   const data = await prisma.budgetYear.findMany({
//     where,
//     ...GetBugetYearReportQuery,
//   });
//   return data;
// };

export const getBugetYearReport = async (
  id?: number,
): Promise<SanitizedBudgetYearReport[]> => {
  const where: Prisma.BudgetYearWhereInput = {
    deletedAt: null,
  };

  if (id) {
    where.id = id;
  }

  const data = await prisma.budgetYear.findMany({
    where,
    ...GetBugetYearReportQuery,
  });

  return data.map(sanitizeBudgetYearReport);
};

export async function getLastFiveTransactions(): Promise<APBTransactionItem[]> {
  const [revenues, expenses, financing] = await Promise.all([
    prisma.revenue.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),

    prisma.expense.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),

    prisma.financing.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),
  ]);

  const mapped: APBTransactionItem[] = [
    ...revenues.map((r) => ({
      id: r.id,
      urlId: r.urlId,
      type: 'Pendapatan' as const,
      categoryOrSector: r.category,
      description: r.description,
      amount: Number(r.realized),
      createdAt: r.createdAt,
    })),

    ...expenses.map((e) => ({
      id: e.id,
      urlId: e.urlId,
      type: 'Belanja' as const,
      categoryOrSector: e.sector,
      description: e.description,
      amount: Number(e.realized),
      createdAt: e.createdAt,
    })),

    ...financing.map((f) => ({
      id: f.id,
      urlId: f.urlId,
      type: 'Pembiayaan' as const,
      categoryOrSector: f.type,
      description: f.description,
      amount: Number(f.amount),
      createdAt: f.createdAt,
    })),
  ];

  // gabungkan & ambil 5 terbaru
  return mapped
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3);
}
