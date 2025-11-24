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
