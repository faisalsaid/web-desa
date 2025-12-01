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

// Helper untuk validasi file image
const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

// Helper untuk string optional yang jika kosong menjadi null
const emptyToNull = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((val) => {
    if (val == null) return null;
    const trimmed = val.trim();
    return trimmed === '' ? null : trimmed;
  })
  .nullable()
  .optional();

// Zod Schema untuk Resident
export const ResidentSchema = z.object({
  id: z.number().int().optional(),

  nik: z.string().length(16, 'Harus 16 digit'),
  fullName: z.string().min(3, 'Minimal 3 karakter').max(100),
  gender: Gender,

  birthPlace: emptyToNull,
  birthDate: z.date().nullable().optional(),

  religion: Religion.nullable().optional(),
  education: Education.nullable().optional(),
  occupation: Occupation.nullable().optional(),
  maritalStatus: MaritalStatus.nullable().optional(),

  bloodType: BloodType.nullable().default('UNKNOWN').optional(),
  disabilityType: DisabilityType.nullable().default('NONE').optional(),
  citizenship: Citizenship.nullable().default('WNI').optional(),

  passportNumber: emptyToNull,
  ethnicity: emptyToNull,
  nationality: emptyToNull,

  address: emptyToNull,
  dusun: emptyToNull,
  rw: emptyToNull,
  rt: emptyToNull,
  phone: emptyToNull,

  // Email boleh kosong, null, atau string valid
  email: emptyToNull.or(z.literal('')),

  populationStatus: PopulationStatus.default('PERMANENT').optional(),
  // familyId: z.number().int().nullable().optional(),
  isActive: z.boolean().default(true).optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),

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
