import { z } from 'zod';

// ENUM
export const RevenueCategoryEnum = z.enum(['OWN_SOURCE', 'TRANSFER', 'OTHER']);

// BASE
export const RevenueSchema = z.object({
  id: z.number().int(),
  urlId: z.string(),
  yearId: z.number().int(),
  category: RevenueCategoryEnum,
  description: z.string().min(1),
  budget: z.string(),
  realized: z.string(),
});

// CREATE
export const RevenueCreateSchema = RevenueSchema.omit({
  id: true,
  urlId: true,
});

export type RevenueCreateInput = z.infer<typeof RevenueCreateSchema>;

// UPDATE
export const RevenueUpdateSchema = RevenueSchema.pick({
  yearId: true,
  category: true,
  description: true,
  budget: true,
  realized: true,
})
  .partial()
  .extend({
    id: z.number().int(), // id wajib untuk update
  });

export type RevenueUpdateInput = z.infer<typeof RevenueUpdateSchema>;

// SOFT DELETE
export const RevenueDeleteSchema = z.object({
  id: z.number().int(),
});

export type RevenueDeleteInput = z.infer<typeof RevenueDeleteSchema>;
