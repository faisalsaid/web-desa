import { StaffPositionType } from '@prisma/client';
import { z } from 'zod';

// Helper untuk string kosong menjadi null
const emptyToNull = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((val) => {
    if (val == null) return null;
    const trimmed = val.trim();
    return trimmed === '' ? null : trimmed;
  })
  .nullable()
  .optional();

export const StaffPositionTypeSchema = z.object({
  id: z.number().int().optional(),

  name: z
    .string()
    .min(2, 'Nama Jabatan tidak boleh kosong')
    .max(100)
    .refine(
      (val) => val.trim().length > 0,
      'Nama jabatan tidak boleh hanya spasi',
    ),
  description: emptyToNull,
  isUnique: z.boolean(),
  positionType: z.enum(StaffPositionType).default(StaffPositionType.OTHER),

  // Relasi, optional karena bisa kosong
  staffAssignments: z.array(z.any()).optional(),
  organizationUnits: z.array(z.any()).optional(),
  staffHistories: z.array(z.any()).optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

// Versi untuk create (tanpa id, createdAt, updatedAt)
export const StaffPositionTypeCreateSchema = StaffPositionTypeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Versi untuk update (semua field optional)
export const StaffPositionTypeUpdateSchema = StaffPositionTypeSchema.partial();

// TypeScript types
export type StaffPositionTypeInput = z.infer<typeof StaffPositionTypeSchema>;
export type StaffPositionTypeCreateInput = z.infer<
  typeof StaffPositionTypeCreateSchema
>;
export type StaffPositionTypeUpdateInput = z.infer<
  typeof StaffPositionTypeUpdateSchema
>;

// =======================================================================================================

/// STAFF SCHEMA ==========================================================================================

export const baseStaffSchema = z.object({
  residentId: z.number().int().positive(),
  positionTypeId: z.number().int().positive(),

  startDate: z.date(),
  endDate: z.date().nullable().optional(),
  // startDate: z.string().pipe(z.coerce.date()),
  // endDate: z.string().pipe(z.coerce.date()).nullable().optional(),

  isActive: z.boolean().optional(),

  // organizationUnitId: z.number().int().positive().nullable().optional(),
});

export const createStaffSchema = baseStaffSchema;

export const updateStaffSchema = baseStaffSchema.extend({
  id: z.number().int().positive(),
});

export type CreateStaffInput = z.infer<typeof createStaffSchema>;
export type UpdateStaffInput = z.infer<typeof updateStaffSchema>;

// =======================================================================================================
