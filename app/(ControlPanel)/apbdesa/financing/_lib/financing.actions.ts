'use server';

import prisma from '@/lib/prisma';
import {
  FinancingCreateInput,
  FinancingCreateSchema,
  FinancingUpdateData,
  FinancingUpdateDataSchema,
} from './financing.zod';
import {
  FinancingDataTableParams,
  FinancingList,
  FinancingResult,
  getFinancingQuery,
} from './financing.type';
import { toDecimal } from '@/lib/utils/helper';
import { FinancingType, Prisma } from '@prisma/client';

// SAFE RETURN TYPE
type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// READ / FIND MANY

export async function getFinancingList(): Promise<ActionResult<FinancingList>> {
  try {
    const results = await prisma.financing.findMany({
      ...getFinancingQuery,
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });

    // sanitize Decimal -> string
    const cleadData = results.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    return { success: true, data: cleadData };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

// FIND ONE by ID

export async function getFinancing(
  id: number,
): Promise<ActionResult<FinancingResult>> {
  try {
    const results = await prisma.financing.findUnique({
      where: { id },
      ...getFinancingQuery,
    });

    if (!results) return { success: false, error: 'Financing not found' };

    // sanitize Decimal -> string

    const sanitize = {
      ...results,
      amount: results.amount.toString(),
    };

    return { success: true, data: sanitize };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

//   CREATED

export async function createFinancing(
  input: FinancingCreateInput,
): Promise<ActionResult<FinancingResult>> {
  const parsed = FinancingCreateSchema.parse(input);
  try {
    const data = {
      ...parsed,
      amount: toDecimal(parsed.amount),
    };

    const financing = await prisma.financing.create({
      data,
      select: getFinancingQuery.select,
    });

    const sanitize = {
      ...financing,
      amount: financing.amount.toString(),
    };

    return { success: true, data: sanitize };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

// UDPATE by ID

export async function updateFinancing(
  id: number,
  input: FinancingUpdateData,
): Promise<ActionResult<FinancingResult>> {
  const parsed = FinancingUpdateDataSchema.parse(input);

  // clean payload
  const cleanAmount =
    parsed.amount !== undefined ? toDecimal(parsed.amount) : undefined;

  try {
    const updated = await prisma.financing.update({
      where: { id },
      data: {
        ...parsed,
        amount: cleanAmount,
      },
      select: getFinancingQuery.select,
    });

    // sanitize
    const sanitize = {
      ...updated,
      amount: updated.amount.toString(),
    };

    return { success: true, data: sanitize };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

// SOFT DELETE by ID

export async function deleteFinancing(
  id: number,
): Promise<ActionResult<boolean>> {
  try {
    await prisma.financing.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { success: true, data: true };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

// GET FINANCE DATA TABEL

export type FinancingTableResult = {
  rows: FinancingList;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export async function getFinanceDataTable(
  params: FinancingDataTableParams,
): Promise<ActionResult<FinancingTableResult>> {
  try {
    const { page, limit, search, yearId, financeType } = params;

    const skip = (page - 1) * limit;

    const where: Prisma.FinancingWhereInput = {
      deletedAt: null,
    };

    if (search) {
      where.OR = [{ description: { contains: search, mode: 'insensitive' } }];
    }

    if (yearId) {
      where.yearId = yearId;
    }

    if (financeType) {
      where.type = financeType as FinancingType; // SAFE ENUM CAST
    }

    const total = await prisma.financing.count({ where });

    // Fetch paginated rows
    const rowsRaw = await prisma.financing.findMany({
      ...getFinancingQuery,
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    // Count total rows for pagination

    const rows = rowsRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    return {
      success: true,
      data: {
        rows,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    };
  } catch (err) {
    return {
      success: false,
      error: (err as Error).message,
    };
  }
}
