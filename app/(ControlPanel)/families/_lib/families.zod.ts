import { z } from 'zod';

/* --------------------------------------
   ENUM: FamilyRelationship
----------------------------------------- */
export const FamilyRelationshipEnum = z.enum([
  'HEAD',
  'SPOUSE',
  'CHILD',
  'PARENT',
  'OTHER',
]);
export type FamilyRelationship = z.infer<typeof FamilyRelationshipEnum>;

/* --------------------------------------
   SCHEMA UTAMA (representasi database)
----------------------------------------- */
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
    .regex(/^\d{1,2}$/, 'Format RW tidak valid'),
  rt: z
    .string()
    .trim()
    .regex(/^\d{1,2}$/, 'Format RT tidak valid'),

  /* nullable di DB, tapi wajib di Create */
  headOfFamilyId: z.number().int().nullable(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

/* --------------------------------------
   MEMBERS INPUT (opsional)
----------------------------------------- */
export const FamilyMemberInputSchema = z.object({
  residentId: z.number().int().min(1),
  relationship: FamilyRelationshipEnum,
});
export type FamilyMemberInput = z.infer<typeof FamilyMemberInputSchema>;

/* --------------------------------------
   SCHEMA UNTUK CREATE
   headOfFamilyId WAJIB
----------------------------------------- */
export const FamilyCreateSchema = FamilySchema.extend({
  headOfFamilyId: z.number().int(), // WAJIB
  members: z.array(FamilyMemberInputSchema).optional(),
}).omit({
  id: true,
  urlId: true,
  createdAt: true,
  updatedAt: true,
});

export type FamilyCreateInput = z.infer<typeof FamilyCreateSchema>;

/* --------------------------------------
   SCHEMA UNTUK UPDATE
   Semua optional
----------------------------------------- */
export const FamilyUpdateSchema = z.object({
  familyCardNumber: FamilySchema.shape.familyCardNumber.optional(),
  address: FamilySchema.shape.address.optional(),
  dusun: FamilySchema.shape.dusun.optional(),
  rw: FamilySchema.shape.rw.optional(),
  rt: FamilySchema.shape.rt.optional(),
  headOfFamilyId: z.number().int().nullable().optional(),

  members: z.array(FamilyMemberInputSchema).optional(),
});

export type FamilyUpdateInput = z.infer<typeof FamilyUpdateSchema>;
