import { z } from 'zod';

// Prisma enum → Zod enum
export const FinancingTypeEnum = z.enum(['RECEIPT', 'EXPENDITURE']);
export type FinancingType = z.infer<typeof FinancingTypeEnum>;

export const AmountSchema = z
  .union([z.string()])
  .transform((val) => String(val).trim())
  .refine((s) => /^-?\d+(\.\d+)?$/.test(s), 'Amount harus angka valid');

/**
 * Base
 */
export const FinancingBaseSchema = z.object({
  yearId: z.number('Wajib pilih').int().positive(),
  type: FinancingTypeEnum,
  description: z.string().min(3, 'Wajib! Minimal 3 karakter').max(2000),
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
