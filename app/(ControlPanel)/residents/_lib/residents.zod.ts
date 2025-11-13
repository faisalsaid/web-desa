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
  nik: z.string().max(16),
  fullName: z.string().max(100),
  gender: Gender,
  birthPlace: z.string().nullable().optional(),
  birthDate: z.coerce.date().nullable().optional(),
  religion: Religion.nullable().optional(),
  education: Education.nullable().optional(),
  occupation: Occupation.nullable().optional(),
  maritalStatus: MaritalStatus.nullable().optional(),
  bloodType: BloodType.default('UNKNOWN'),
  disabilityType: DisabilityType.default('NONE'),
  citizenship: Citizenship.default('WNI'),
  passportNumber: z.string().max(50).nullable().optional(),
  ethnicity: z.string().max(100).nullable().optional(),
  nationality: z.string().max(100).nullable().optional(),
  address: z.string().nullable().optional(),
  dusun: z.string().nullable().optional(),
  rw: z.string().nullable().optional(),
  rt: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  populationStatus: PopulationStatus.default('PERMANENT'),
  familyId: z.number().int().nullable().optional(),
  isActive: z.boolean().default(true),
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
