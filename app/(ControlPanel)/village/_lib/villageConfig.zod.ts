import { z } from 'zod';

export const villageConfigUpdateSchema = z.object({
  villageCode: z.string().max(10).optional(),
  villageName: z.string().optional(),

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

  areaSize: z.number().nullable().optional(),
  areaUnit: z.string().default('km²').optional(),
  populationTotal: z.number().int().default(0).optional(),
  hamletCount: z.number().int().default(0).optional(),
  rwCount: z.number().int().default(0).optional(),
  rtCount: z.number().int().default(0).optional(),

  borderNorth: z.string().nullable().optional(),
  borderEast: z.string().nullable().optional(),
  borderSouth: z.string().nullable().optional(),
  borderWest: z.string().nullable().optional(),
  elevation: z.number().int().nullable().optional(),

  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),

  logoUrl: z.string().url().nullable().optional(),
  officePhotoUrl: z.string().url().nullable().optional(),
  vision: z.string().nullable().optional(),
  mission: z.string().nullable().optional(),
  slogan: z.string().nullable().optional(),

  isActive: z.boolean().optional(),
});

export type villageConfigUpdateValues = z.infer<
  typeof villageConfigUpdateSchema
>;
