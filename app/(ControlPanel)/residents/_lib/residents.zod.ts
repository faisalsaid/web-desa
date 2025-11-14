import { z } from 'zod';

// ENUMS sesuai Prisma model
export const Gender = z.enum(['MALE', 'FEMALE']);

export const Religion = z.enum([
  'ISLAM',
  'CHRISTIAN',
  'CATHOLIC',
  'HINDU',
  'BUDDHIST',
  'CONFUCIAN',
  'OTHER',
]);

export const Education = z.enum([
  'NONE',
  'ELEMENTARY',
  'JUNIOR_HIGH',
  'SENIOR_HIGH',
  'VOCATIONAL_HIGH',
  'DIPLOMA_1',
  'DIPLOMA_2',
  'DIPLOMA_3',
  'BACHELOR',
  'MASTER',
  'DOCTORATE',
  'OTHER',
]);

export const MaritalStatus = z.enum([
  'SINGLE',
  'MARRIED',
  'DIVORCED',
  'WIDOWED',
]);

export const Occupation = z.enum([
  'FARMER',
  'FISHERMAN',
  'TRADER',
  'CIVIL_SERVANT',
  'MILITARY',
  'POLICE',
  'PRIVATE_EMPLOYEE',
  'TEACHER',
  'STUDENT',
  'UNIVERSITY_STUDENT',
  'LABORER',
  'HOUSEWIFE',
  'UNEMPLOYED',
  'OTHER',
]);

export const BloodType = z.enum(['A', 'B', 'AB', 'O', 'UNKNOWN']);

export const PopulationStatus = z.enum([
  'PERMANENT',
  'TEMPORARY',
  'MOVED_OUT',
  'DECEASED',
]);

export const DisabilityType = z.enum([
  'NONE',
  'PHYSICAL',
  'VISUAL',
  'HEARING',
  'MENTAL',
  'INTELLECTUAL',
  'MULTIPLE',
  'OTHER',
]);

export const Citizenship = z.enum(['WNI', 'WNA']);

// Zod Schema untuk Resident
export const ResidentSchema = z.object({
  id: z.number().int().optional(),
  nik: z.string().max(16).min(1, 'Tidak Boleh Kosong'),
  fullName: z.string().max(100).min(3, 'Minimal 3 carakter'),
  gender: Gender,
  //   birthPlace: z.string().nullable().optional(),
  birthPlace: z
    .union([z.string(), z.null(), z.undefined()])
    .transform((val) => {
      if (val == null) return null; // null atau undefined → null

      const trimmed = val.trim();
      if (trimmed === '') return null; // string kosong → null

      return trimmed; // string valid → disimpan apa adanya
    })
    .nullable()
    .optional(),
  birthDate: z.date().nullable().optional(),
  religion: Religion.nullable().optional(),
  education: Education.nullable().optional(),
  occupation: Occupation.nullable().optional(),
  maritalStatus: MaritalStatus.nullable().optional(),
  bloodType: BloodType.default('UNKNOWN').optional(),
  disabilityType: DisabilityType.default('NONE').optional(),
  citizenship: Citizenship.default('WNI').optional(),
  passportNumber: z.string().max(50).nullable().optional(),
  ethnicity: z.string().max(100).nullable().optional(),
  nationality: z.string().max(100).nullable().optional(),
  address: z.string().nullable().optional(),
  dusun: z.string().nullable().optional(),
  rw: z.string().nullable().optional(),
  rt: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.email('Email tidak valid').optional().or(z.literal('')),
  populationStatus: PopulationStatus.default('PERMANENT').optional(),
  familyId: z.number().int().nullable().optional(),
  isActive: z.boolean().default(true).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

// Jika kamu ingin bikin versi untuk create/update (tanpa id & createdAt/updatedAt)
export const ResidentCreateSchema = ResidentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const ResidentUpdateSchema = ResidentSchema.partial();

export type ResidentInput = z.infer<typeof ResidentSchema>;
export type ResidentCreateInput = z.infer<typeof ResidentCreateSchema>;
export type ResidentUpdateInput = z.infer<typeof ResidentUpdateSchema>;
