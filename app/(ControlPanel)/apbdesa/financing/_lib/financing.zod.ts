import { z } from 'zod';
import { FinancingType as PrismaFinancingType } from '@prisma/client';

// Prisma enum → Zod enum
export const FinancingTypeEnum = z.enum(
  Object.values(PrismaFinancingType) as [string, ...string[]],
);

// TypeScript type → gunakan langsung dari Prisma
export type FinancingType = PrismaFinancingType;

export const AmountSchema = z
  .union([z.string(), z.number()])
  .transform((val) => String(val).trim())
  .refine((s) => /^-?\d+(\.\d+)?$/.test(s), 'Amount harus angka valid');

/**
 * Base
 */
export const FinancingBaseSchema = z.object({
  yearId: z.number().int().positive(),
  type: FinancingTypeEnum,
  description: z.string().min(1).max(2000),
  amount: AmountSchema, // ← STRING setelah transform
});

/**
 * Create
 */
export const FinancingCreateSchema = FinancingBaseSchema;
export type FinancingCreateInput = z.infer<typeof FinancingCreateSchema>;

/**
 * Update
 */
export const FinancingUpdateDataSchema = FinancingBaseSchema.partial();
export type FinancingUpdateData = z.infer<typeof FinancingUpdateDataSchema>;

// /**
//  * Read (API output)
//  */
// export const FinancingReadSchema = FinancingBaseSchema.extend({
//   id: z.number(),
//   urlId: z.string(),
//   createdAt: z.string(),
//   updatedAt: z.string(),
//   deletedAt: z.string().nullable(),
// });
// export type FinancingRead = z.infer<typeof FinancingReadSchema>;
