'use server';

import prisma from '@/lib/prisma';
import { getBudgetYearQuery, GetBudgetYearResult } from './apbdesa.type';
import z from 'zod';
import {
  BudgetYearCreateSchema,
  BudgetYearDeleteSchema,
  BudgetYearUpdateSchema,
} from './apbdesa.zod';

// CREATE
export async function createBudgetYear(
  input: z.infer<typeof BudgetYearCreateSchema>,
): Promise<GetBudgetYearResult> {
  console.log('ACTION INPUT', input);

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
