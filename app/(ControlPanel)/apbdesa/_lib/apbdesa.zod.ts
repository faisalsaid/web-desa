import z from 'zod';

export const BudgetYearSchema = z.object({
  id: z.number().int(),
  year: z
    .number()
    .int()
    .refine((val) => val >= 1000 && val <= 9999, {
      message: 'Year must be a 4-digit number',
    }),
  isActive: z.boolean(),
  isLocked: z.boolean(),
  isFinalized: z.boolean(),
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
