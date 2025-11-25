// src/actions/expense.ts
'use server';

import prisma from '@/lib/prisma';
import {
  ExpenseDataTableParams,
  GetExpenseList,
  getExpenseQuery,
  GetExpenseResult,
} from './expense.type';
import { expenseCreateSchema, expenseUpdateSchema } from './expense.zod';
import { toDecimal } from '@/lib/utils/helper';

// import { prisma } from "@/lib/prisma";
// import { toDecimal } from "@/lib/decimal";
// import {
//   expenseCreateSchema,
//   expenseUpdateSchema,
// } from "@/lib/validators/expense";
// import { getExpenseQuery, GetExpenseResult, GetExpenseList } from "@/db/queries/expense";

// READ ─────────────────────────────────────────────────────────────
export async function getExpenses(): Promise<GetExpenseList> {
  const data = await prisma.expense.findMany({
    ...getExpenseQuery,
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' },
  });

  return data;
}

export async function getExpenseByUrlId(
  urlId: string,
): Promise<GetExpenseResult | null> {
  return await prisma.expense.findUnique({
    ...getExpenseQuery,
    where: { urlId },
  });
}

// CREATE ────────────────────────────────────────────────────────────
export async function createExpense(form: unknown): Promise<GetExpenseResult> {
  const parsed = expenseCreateSchema.parse(form);

  const cleanBudget = toDecimal(parsed.budget);
  const cleanRealized = toDecimal(parsed.realized);

  const created = await prisma.expense.create({
    data: {
      ...parsed,
      budget: cleanBudget,
      realized: cleanRealized,
    },
    select: getExpenseQuery.select,
  });

  return created;
}

// UPDATE ────────────────────────────────────────────────────────────
export async function updateExpense(
  urlId: string,
  form: unknown,
): Promise<GetExpenseResult> {
  const parsed = expenseUpdateSchema.parse(form);

  const cleanBudget =
    parsed.budget !== undefined ? toDecimal(parsed.budget) : undefined;

  const cleanRealized =
    parsed.realized !== undefined ? toDecimal(parsed.realized) : undefined;

  const updated = await prisma.expense.update({
    where: { urlId },
    data: {
      ...parsed,
      budget: cleanBudget,
      realized: cleanRealized,
    },
    select: getExpenseQuery.select,
  });

  return updated;
}

// DELETE (Soft Delete) ──────────────────────────────────────────────
export async function deleteExpense(urlId: string): Promise<GetExpenseResult> {
  const deleted = await prisma.expense.update({
    where: { urlId },
    data: { deletedAt: new Date() },
    select: getExpenseQuery.select,
  });

  return deleted;
}

// HANDLE GET EXPENSE DATA TABLE

export interface ExpenseDataTableResult {
  data: GetExpenseList;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function getExpenseDataTable(
  params: ExpenseDataTableParams,
): Promise<ExpenseDataTableResult> {
  const { page, limit, search, yearId, sector } = params;

  const offset = (page - 1) * limit;

  // ========== WHERE CONDITIONS ==========
  const where: any = {
    deletedAt: null,
  };

  if (search) {
    where.OR = [
      { description: { contains: search, mode: 'insensitive' } },
      { sector: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (yearId) {
    where.yearId = yearId;
  }

  if (sector) {
    where.sector = sector as any;
  }

  // ========== COUNT ==========
  const total = await prisma.expense.count({ where });

  // ========== DATA FETCH (Typed With getExpenseQuery) ==========
  const data = await prisma.expense.findMany({
    ...getExpenseQuery,
    where,
    orderBy: {
      createdAt: 'desc',
    },
    skip: offset,
    take: limit,
  });

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
