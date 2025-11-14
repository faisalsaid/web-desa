import { z } from 'zod';

export const FamilySchema = z.object({
  id: z.number().int().optional(),
  urlId: z.string().optional(),

  familyCardNumber: z
    .string()
    .min(16, 'Nomor KK minimal 16 digit')
    .max(20, 'Nomor KK maksimal 20 digit')
    .regex(/^\d+$/, 'Nomor KK hanya boleh angka'),

  address: z.string().min(3, 'Alamat tidak boleh kosong'),

  dusun: z.string().trim().min(1, 'Dusun wajib dipilih'),

  rw: z
    .string()
    .trim()
    .min(1, 'RW wajib dipilih')
    .regex(/^\d{1,2}$/, 'Format RW tidak valid'),

  rt: z
    .string()
    .trim()
    .min(1, 'RT wajib dipilih')
    .regex(/^\d{1,2}$/, 'Format RT tidak valid'),

  headOfFamilyId: z.number().int().optional().nullable(),
});

export const FamilyCreateSchema = FamilySchema.omit({
  id: true,
  urlId: true,
});

export const FamilyUpdateSchema = z.object({
  familyCardNumber: FamilySchema.shape.familyCardNumber.optional(),
  address: FamilySchema.shape.address.optional(),
  dusun: FamilySchema.shape.dusun.optional(),
  rw: FamilySchema.shape.rw.optional(),
  rt: FamilySchema.shape.rt.optional(),
  headOfFamilyId: FamilySchema.shape.headOfFamilyId.optional(),
});

export type FamilyInput = z.infer<typeof FamilySchema>;
export type FamilyCreateInput = z.infer<typeof FamilyCreateSchema>;
export type FamilyUpdateInput = z.infer<typeof FamilyUpdateSchema>;
