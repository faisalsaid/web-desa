import z from 'zod';

export const BudgetYearSchema = z.object({
  id: z.number().int(),
  year: z.number().int().min(4).max(4),
  isActive: z.boolean().default(false),
  isLocked: z.boolean().default(false),
  isFinalized: z.boolean().default(false),
});

// DELETE
export const BudgetYearDeleteSchema = z.object({
  id: z.number().int(),
});

export const BudgetYearCreateSchema = BudgetYearSchema.omit({
  id: true,
});

export const BudgetYearUpdateSchema = BudgetYearSchema.partial();

export type BudgetYearCreateInput = z.infer<typeof BudgetYearCreateSchema>;
export type BudgetYearUpdateInput = z.infer<typeof BudgetYearUpdateSchema>;
