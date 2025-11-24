'use server';

import prisma from '@/lib/prisma';
import {
  RevenueCreateInput,
  RevenueCreateSchema,
  RevenueUpdateInput,
  RevenueUpdateSchema,
  RevenueDeleteSchema,
} from './revenue.zod';
import { getRevenueQuery, GetRevenueResult } from './revenue.type';
import z from 'zod';
import { RevenueCategory } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

// -------- CREATE --------
export async function createRevenue(
  input: RevenueCreateInput,
): Promise<GetRevenueResult> {
  // Validasi input dengan Zod
  const data = RevenueCreateSchema.parse(input);

  // Simpan ke database
  const result = await prisma.revenue.create({
    data: {
      ...data,
      budget: new Decimal(data.budget),
      realized: new Decimal(data.realized),
    },
    ...getRevenueQuery,
  });

  // Konversi Decimal ke string agar aman dikirim ke frontend
  const sanitizedResult: GetRevenueResult = {
    ...result,
    budget: result.budget.toString(),
    realized: result.realized.toString(),
  };

  return sanitizedResult;
}

// -------- READ BY ID --------
export async function getRevenueById(
  id: number,
): Promise<GetRevenueResult | null> {
  const result = await prisma.revenue.findUnique({
    where: { id },
    ...getRevenueQuery,
  });

  if (!result) return null;

  // Konversi Decimal ke string untuk frontend
  const sanitizedResult: GetRevenueResult = {
    ...result,
    budget: result.budget.toString(),
    realized: result.realized.toString(),
  };

  return sanitizedResult;
}

// -------- READ ALL --------
export async function getAllRevenue(): Promise<GetRevenueResult[]> {
  const results = await prisma.revenue.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' },
    ...getRevenueQuery,
  });

  // Konversi Decimal ke string
  const sanitizedResults: GetRevenueResult[] = results.map((item) => ({
    ...item,
    budget: item.budget.toString(),
    realized: item.realized.toString(),
  }));

  return sanitizedResults;
}

// -------- READ ALL BY YEAR --------
export async function getAllRevenueByYear(): Promise<GetRevenueResult[]> {
  const results = await prisma.revenue.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' },
    ...getRevenueQuery,
  });

  // Konversi Decimal ke string
  const sanitizedResults: GetRevenueResult[] = results.map((item) => ({
    ...item,
    budget: item.budget.toString(),
    realized: item.realized.toString(),
  }));

  return sanitizedResults;
}

// -------- UPDATE --------
export async function updateRevenue(
  input: RevenueUpdateInput,
): Promise<GetRevenueResult> {
  const data = RevenueUpdateSchema.parse(input);

  const { id, ...updateData } = data;

  // Pastikan budget dan realized dikonversi ke Decimal jika ada
  const prismaUpdateData: any = {
    ...updateData,
  };
  if (updateData.budget !== undefined) {
    prismaUpdateData.budget = new Decimal(updateData.budget);
  }
  if (updateData.realized !== undefined) {
    prismaUpdateData.realized = new Decimal(updateData.realized);
  }

  const result = await prisma.revenue.update({
    where: { id },
    data: prismaUpdateData,
    ...getRevenueQuery,
  });

  // Konversi Decimal ke string untuk frontend
  const sanitizedResult: GetRevenueResult = {
    ...result,
    budget: result.budget.toString(),
    realized: result.realized.toString(),
  };

  return sanitizedResult;
}

// -------- SOFT DELETE --------
export async function softDeleteRevenue(
  input: z.infer<typeof RevenueDeleteSchema>,
): Promise<GetRevenueResult> {
  const { id } = RevenueDeleteSchema.parse(input);

  const result = await prisma.revenue.update({
    where: { id },
    data: { deletedAt: new Date() },
    ...getRevenueQuery,
  });

  // Konversi Decimal ke string agar aman untuk frontend
  const sanitizedResult: GetRevenueResult = {
    ...result,
    budget: result.budget.toString(),
    realized: result.realized.toString(),
  };

  return sanitizedResult;
}

export interface GetRevenueDataTableParams {
  page?: number;
  limit?: number;
  search?: string;
  yearId?: number;
  category?: RevenueCategory;
}

export interface GetRevenueDataTableResult {
  data: GetRevenueResult[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getRevenueDataTable(
  params: GetRevenueDataTableParams,
): Promise<GetRevenueDataTableResult> {
  const { page = 1, limit = 10, search, yearId, category } = params;

  const where: any = {
    deletedAt: null, // exclude soft-deleted
  };

  if (search) {
    where.description = { contains: search, mode: 'insensitive' };
  }

  if (yearId) {
    where.yearId = yearId;
  }

  if (category) {
    where.category = category;
  }

  const total = await prisma.revenue.count({ where });

  const data = await prisma.revenue.findMany({
    where,
    ...getRevenueQuery,
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });

  const sanitizedData = data.map((item) => ({
    ...item,
    budget: (item.budget as Decimal).toString(),
    realized: (item.realized as Decimal).toString(),
  }));

  return {
    data: sanitizedData,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
