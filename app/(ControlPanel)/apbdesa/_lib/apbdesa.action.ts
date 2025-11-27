'use server';

import prisma from '@/lib/prisma';
import {
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
