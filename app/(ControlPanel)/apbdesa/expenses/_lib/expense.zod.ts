import { z } from 'zod';

//
// ─── ENUM ──────────────────────────────────────────────────────────
//
export const expenseSectorEnum = z.enum([
  'GOVERNMENT_ADMIN',
  'DEVELOPMENT',
  'COMMUNITY_GUIDANCE',
  'EMPOWERMENT',
  'EMERGENCY',
]);

//
// ─── BASE SCHEMA ─────────────────────────────────────────────────────
//   Digunakan sebagai dasar derive untuk create & update
//
export const expenseBaseSchema = z.object({
  yearId: z.number(),
  sector: expenseSectorEnum,
  description: z.string().min(1),
  budget: z.string().regex(/^\d+(\.\d+)?$/, 'Invalid decimal format'),
  realized: z.string().regex(/^\d+(\.\d+)?$/, 'Invalid decimal format'),
  deletedAt: z.string().datetime().nullable().optional(),
});

//
// ─── CREATE SCHEMA ───────────────────────────────────────────────────
//
export const expenseCreateSchema = expenseBaseSchema;

//
// ─── UPDATE SCHEMA (PARTIAL) ─────────────────────────────────────────
//
export const expenseUpdateSchema = expenseBaseSchema.partial();

//
// ─── URL ID SCHEMA (PARAM) ───────────────────────────────────────────
//
export const expenseUrlIdSchema = z.object({
  urlId: z.string().cuid(),
});

//
// ─── TYPESCRIPT INFERRED TYPES ───────────────────────────────────────
//
export type ExpenseSector = z.infer<typeof expenseSectorEnum>;
export type ExpenseBase = z.infer<typeof expenseBaseSchema>;
export type ExpenseCreate = z.infer<typeof expenseCreateSchema>;
export type ExpenseUpdate = z.infer<typeof expenseUpdateSchema>;
export type ExpenseUrlIdParam = z.infer<typeof expenseUrlIdSchema>;
