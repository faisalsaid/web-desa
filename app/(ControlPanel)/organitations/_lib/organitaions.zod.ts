import { StaffPositionType } from '@prisma/client';
import { id } from 'date-fns/locale';
import { url } from 'inspector';
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

// Helper untuk validasi file image
const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const baseStaffSchema = z.object({
  id: z.number().int().optional(),
  urlId: z.string().optional().nullable(),
  positionTypeId: z.number().int().positive(),
  residentId: z.number().int().positive().optional().nullable(),
  name: z
    .string()
    .min(2, 'Nama tidak boleh kosong')
    .max(100)
    .refine((val) => val.trim().length > 0, 'Nama tidak boleh hanya spasi'),
  startDate: z.date(),
  endDate: z.date().nullable().optional(),
  isActive: z.boolean().optional(),

  image: z
    .custom<File | string | null | undefined>((val) => {
      // 1. Izinkan null atau undefined (kosong)
      if (val === null || val === undefined) return true;
      // 2. Jika ada isinya, harus File atau String
      return val instanceof File || typeof val === 'string';
    }, 'Gambar wajib diupload') // Pesan ini sebenarnya jarang muncul karena null diizinkan
    .refine((val) => {
      // 1. SKIP validasi jika kosong (optional) atau string (URL lama)
      if (!val || typeof val === 'string') return true;

      // 2. Cek ukuran HANYA jika itu File
      return val instanceof File ? val.size <= MAX_FILE_SIZE : false;
    }, 'Ukuran file maksimal 5MB')
    .refine((val) => {
      // 1. SKIP validasi jika kosong (optional) atau string (URL lama)
      if (!val || typeof val === 'string') return true;

      // 2. Cek tipe HANYA jika itu File
      return val instanceof File
        ? ACCEPTED_IMAGE_TYPES.includes(val.type)
        : false;
    }, 'Format file harus .jpg, .jpeg, .png atau .webp')
    .optional() // Tambahkan ini agar TypeScript menganggapnya optional (?)
    .nullable(), // Tambahkan ini agar bisa menerima null

  // organizationUnitId: z.number().int().positive().nullable().optional(),
});

export const createStaffSchema = baseStaffSchema.omit({
  id: true,
});

export const updateStaffSchema = baseStaffSchema.partial();

export type CreateStaffInput = z.infer<typeof createStaffSchema>;
export type UpdateStaffInput = z.infer<typeof updateStaffSchema>;

// =======================================================================================================
