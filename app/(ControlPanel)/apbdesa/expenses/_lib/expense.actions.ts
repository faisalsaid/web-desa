// src/actions/expense.ts
'use server';

import prisma from '@/lib/prisma';
import {
  ExpenseDataTableParams,
  GetExpenseList,
  getExpenseQuery,
  GetExpenseResult,
} from './expense.type';
import {
  ExpenseCreate,
  expenseCreateSchema,
  ExpenseUpdate,
  expenseUpdateSchema,
} from './expense.zod';
import { toDecimal } from '@/lib/utils/helper';
import { ExpenseSector, Prisma } from '@prisma/client';

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

  // sanitize Decimal -> string
  return data.map((item) => ({
    ...item,
    budget: item.budget.toString(),
    realized: item.realized.toString(),
  }));
}

export async function getExpenseByUrlId(
  urlId: string,
): Promise<GetExpenseResult | null> {
  const expense = await prisma.expense.findUnique({
    ...getExpenseQuery,
    where: { urlId },
  });

  if (!expense) return null;

  return {
    ...expense,
    budget: expense.budget.toString(),
    realized: expense.realized.toString(),
  };
}

// CREATE ────────────────────────────────────────────────────────────
export async function createExpense(
  form: ExpenseCreate,
): Promise<GetExpenseResult> {
  // validasi schema (masih perlu agar runtime aman)
  const parsed = expenseCreateSchema.parse(form);

  // sanitize Decimal untuk Prisma
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

  // konversi Decimal ke string agar aman dikirim ke client
  return {
    ...created,
    budget: created.budget.toString(),
    realized: created.realized.toString(),
  };
}

export async function updateExpense(
  urlId: string,
  form: ExpenseUpdate, // <-- typed safe
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

  // sanitize Decimal -> string sebelum dikirim ke client
  return {
    ...updated,
    budget: updated.budget.toString(),
    realized: updated.realized.toString(),
  };
}

// DELETE (Soft Delete) ──────────────────────────────────────────────
export async function deleteExpense(id: number): Promise<GetExpenseResult> {
  const deleted = await prisma.expense.update({
    where: { id },
    data: { deletedAt: new Date() },
    select: getExpenseQuery.select,
  });

  // sanitize Decimal -> string
  return {
    ...deleted,
    budget: deleted.budget.toString(),
    realized: deleted.realized.toString(),
  };
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

  // ============================================================
  // TYPE-SAFE WHERE (NO ANY)
  // ============================================================
  const where: Prisma.ExpenseWhereInput = {
    deletedAt: null,
  };

  if (search) {
    where.OR = [{ description: { contains: search, mode: 'insensitive' } }];
  }

  if (yearId) {
    where.yearId = yearId;
  }

  if (sector) {
    where.sector = sector as ExpenseSector; // SAFE ENUM CAST
  }

  // ============================================================
  // COUNT
  // ============================================================
  const total = await prisma.expense.count({ where });

  // ============================================================
  // DATA FETCH (typed)
  // ============================================================
  const dataRaw = await prisma.expense.findMany({
    ...getExpenseQuery,
    where,
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: limit,
  });

  // ============================================================
  // SANITIZE DECIMAL -> STRING
  // ============================================================
  const data = dataRaw.map((item) => ({
    ...item,
    budget: item.budget.toString(),
    realized: item.realized.toString(),
  }));

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
