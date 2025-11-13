import { z } from 'zod';

export const villageConfigUpdateSchema = z.object({
  villageCode: z.string().max(10).min(1, 'Wajib Terisi'),
  villageName: z.string().min(3, 'Wajib Terisi'),

  districtCode: z.string().max(6).nullable().optional(),
  districtName: z.string().nullable().optional(),
  regencyCode: z.string().max(4).nullable().optional(),
  regencyName: z.string().nullable().optional(),
  provinceCode: z.string().max(2).nullable().optional(),
  provinceName: z.string().nullable().optional(),
  officeAddress: z.string().nullable().optional(),
  postalCode: z.string().max(10).nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.email().nullable().optional(),
  website: z.url().nullable().optional(),
  establishedYear: z.number().int().nullable().optional(),

  description: z.string().nullable().optional(),

  areaSize: z
    .union([z.string(), z.number(), z.null()])
    .transform((val) => {
      if (val == null) return null;
      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed === '') return null;
        const parsed = Number(trimmed);
        return isNaN(parsed) ? null : parsed;
      }
      return val;
    })
    .nullable()
    .optional(),
  areaUnit: z.string().default('km²').optional().nullable(),
  populationTotal: z.number().int().default(0).optional().nullable(),
  hamletCount: z.number().int().default(0).optional().nullable(),
  rwCount: z.number().int().default(0).optional().nullable(),
  rtCount: z.number().int().default(0).optional().nullable(),

  borderNorth: z
    .union([z.string(), z.null(), z.undefined()])
    .transform((val) => {
      if (val == null) return null; // null atau undefined → null

      const trimmed = val.trim();
      if (trimmed === '') return null; // string kosong → null

      return trimmed; // string valid → disimpan apa adanya
    })
    .nullable()
    .optional(),

  borderEast: z
    .union([z.string(), z.null(), z.undefined()])
    .transform((val) => {
      if (val == null) return null; // null atau undefined → null

      const trimmed = val.trim();
      if (trimmed === '') return null; // string kosong → null

      return trimmed; // string valid → disimpan apa adanya
    })
    .nullable()
    .optional(),

  borderSouth: z
    .union([z.string(), z.null(), z.undefined()])
    .transform((val) => {
      if (val == null) return null; // null atau undefined → null

      const trimmed = val.trim();
      if (trimmed === '') return null; // string kosong → null

      return trimmed; // string valid → disimpan apa adanya
    })
    .nullable()
    .optional(),

  borderWest: z
    .union([z.string(), z.null(), z.undefined()])
    .transform((val) => {
      if (val == null) return null; // null atau undefined → null

      const trimmed = val.trim();
      if (trimmed === '') return null; // string kosong → null

      return trimmed; // string valid → disimpan apa adanya
    })
    .nullable()
    .optional(),

  elevation: z.number().int().nullable().optional(),

  latitude: z
    .union([z.string(), z.number(), z.null()])
    .transform((val) => {
      if (val == null) return null;

      // Jika string kosong / spasi → null
      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed === '') return null;

        const parsed = Number(trimmed);
        if (isNaN(parsed)) {
          throw new Error('Nilai latitude harus berupa angka');
        }
        return parsed;
      }

      // Kalau sudah number → langsung kembalikan
      return val;
    })
    .nullable()
    .optional(),

  longitude: z
    .union([z.string(), z.number(), z.null()])
    .transform((val) => {
      if (val == null) return null;

      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed === '') return null;

        const parsed = Number(trimmed);
        if (isNaN(parsed)) {
          throw new Error('Nilai longitude harus berupa angka');
        }
        return parsed;
      }

      return val;
    })
    .nullable()
    .optional(),

  logoUrl: z.url().nullable().optional(),
  officePhotoUrl: z.url().nullable().optional(),
  vision: z.string().nullable().optional(),
  mission: z.string().nullable().optional(),
  slogan: z.string().nullable().optional(),

  isActive: z.boolean().optional(),
});

export type villageConfigUpdateValues = z.infer<
  typeof villageConfigUpdateSchema
>;
