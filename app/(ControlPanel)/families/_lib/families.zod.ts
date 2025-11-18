import { z } from 'zod';

// Enum FamilyRelationship sesuai schema Prisma
export const FamilyRelationshipEnum = z.enum([
  'HEAD',
  'SPOUSE',
  'CHILD',
  'PARENT',
  'SIBLING',
  'OTHER',
]);

// Schema untuk anggota Family (Resident existing)
export const MemberSchema = z.object({
  residentId: z.number(), // ID resident di database
  fullName: z.string().min(1), // untuk UI/UX
  nik: z.string().length(16), // untuk UI/UX
  familyRelationship: FamilyRelationshipEnum,
});

// Schema utama Family
export const FamilySchema = z.object({
  id: z.number(), // untuk database, optional di create
  urlId: z.string().optional(),
  familyCardNumber: z
    .string()
    .min(16, 'Nomor KK minimal 16 digit')
    .max(20, 'Nomor KK maksimal 20 digit')
    .regex(/^\d+$/, 'Nomor KK hanya boleh angka'),
  address: z.string().trim().min(1, 'Alamat wajib diisi'),
  dusun: z.string().trim().min(1, 'Wajib'),
  rw: z.string().regex(/^\d{1,2}$/, 'Wajib'),
  rt: z.string().regex(/^\d{1,2}$/, 'Wajib'),
  members: z
    .array(MemberSchema)
    .min(1, 'Harus ada minimal satu anggota keluarga')
    .refine(
      (members) =>
        members.filter((m) => m.familyRelationship === 'HEAD').length === 1,
      'Hanya boleh ada satu anggota dengan familyRelationship HEAD',
    ),
});

// Versi untuk create → id & urlId tidak dikirim
export const FamilyCreateSchema = FamilySchema.omit({
  id: true,
  urlId: true,
});

// Versi untuk update → semua field optional
export const FamilyUpdateSchema = FamilySchema.partial();

// TypeScript types
export type FamilyInput = z.infer<typeof FamilySchema>;
export type FamilyCreateInput = z.infer<typeof FamilyCreateSchema>;
export type FamilyUpdateInput = z.infer<typeof FamilyUpdateSchema>;
export type MemberInput = z.infer<typeof MemberSchema>;
export type FamilyRelationship = z.infer<typeof FamilyRelationshipEnum>;
