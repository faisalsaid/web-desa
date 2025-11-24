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

// -------- CREATE --------
export async function createRevenue(
  input: RevenueCreateInput,
): Promise<GetRevenueResult> {
  const data = RevenueCreateSchema.parse(input);

  return prisma.revenue.create({
    data,
    ...getRevenueQuery,
  });
}

// -------- READ BY ID --------
export async function getRevenueById(
  id: number,
): Promise<GetRevenueResult | null> {
  return prisma.revenue.findUnique({
    where: { id },
    ...getRevenueQuery,
  });
}

// -------- READ ALL --------
export async function getAllRevenue(): Promise<GetRevenueResult[]> {
  return prisma.revenue.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' },
    ...getRevenueQuery,
  });
}

// -------- READ ALL BY YEAR --------
export async function getAllRevenueByYear(): Promise<GetRevenueResult[]> {
  return prisma.revenue.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' },
    ...getRevenueQuery,
  });
}

// -------- UPDATE --------
export async function updateRevenue(
  input: RevenueUpdateInput,
): Promise<GetRevenueResult> {
  const data = RevenueUpdateSchema.parse(input);

  const { id, ...updateData } = data;

  return prisma.revenue.update({
    where: { id },
    data: updateData,
    ...getRevenueQuery,
  });
}

// -------- SOFT DELETE --------
export async function deleteRevenue(
  input: z.infer<typeof RevenueDeleteSchema>,
): Promise<GetRevenueResult> {
  const { id } = RevenueDeleteSchema.parse(input);

  return prisma.revenue.update({
    where: { id },
    data: { deletedAt: new Date() },
    ...getRevenueQuery,
  });
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

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
