import z from 'zod';

export const villageProfileSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  tagline: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  vision: z.string().optional().nullable(),
  mission: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  province: z.string().optional().nullable(),
  regency: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  village: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  areaKm2: z.number().optional().nullable(),
  elevation: z.number().optional().nullable(),
  population: z.number().optional().nullable(),
  northBorder: z.string().optional().nullable(),
  eastBorder: z.string().optional().nullable(),
  southBorder: z.string().optional().nullable(),
  westBorder: z.string().optional().nullable(),
  mapUrl: z.string().optional().nullable(),
});

export type VillageProfileFormValues = z.infer<typeof villageProfileSchema>;
