import { RevenueCategoryEnum } from '@/app/(ControlPanel)/apbdesa/revenue/_lib/revenue.zod';
import { FamilyRelationshipEnum } from '@/app/(ControlPanel)/families/_lib/families.zod';
import { ExpenseSector, StaffPositionType } from '@prisma/client';

type FamilyRelationship = keyof typeof FamilyRelationshipEnum.enum;

type RevenueCategory = keyof typeof RevenueCategoryEnum.enum;
// type Ex = keyof typeof RevenueCategoryEnum.enum;

// Mapping enum ke label bahasa Indonesia
export const religionLabels: Record<string, string> = {
  ISLAM: 'Islam',
  CHRISTIAN: 'Kristen',
  CATHOLIC: 'Katolik',
  HINDU: 'Hindu',
  BUDDHIST: 'Buddha',
  CONFUCIAN: 'Konghucu',
  OTHER: 'Kepercayaan',
};

export const educationLabels: Record<string, string> = {
  NONE: 'Tidak Sekolah',
  ELEMENTARY: 'SD',
  JUNIOR_HIGH: 'SMP',
  SENIOR_HIGH: 'SMA',
  VOCATIONAL_HIGH: 'SMK',
  DIPLOMA_1: 'D1',
  DIPLOMA_2: 'D2',
  DIPLOMA_3: 'D3',
  BACHELOR: 'S1',
  MASTER: 'S2',
  DOCTORATE: 'S3',
  OTHER: 'Lainnya',
};

export const occupationLabels: Record<string, string> = {
  FARMER: 'Petani',
  FISHERMAN: 'Nelayan',
  TRADER: 'Pedagang',
  CIVIL_SERVANT: 'Pegawai Negeri',
  MILITARY: 'TNI',
  POLICE: 'Polisi',
  PRIVATE_EMPLOYEE: 'Karyawan Swasta',
  TEACHER: 'Guru',
  STUDENT: 'Pelajar',
  UNIVERSITY_STUDENT: 'Mahasiswa',
  LABORER: 'Buruh',
  HOUSEWIFE: 'Ibu Rumah Tangga',
  UNEMPLOYED: 'Tidak Bekerja',
  OTHER: 'Lainnya',
};

export const maritalStatusLabels: Record<string, string> = {
  SINGLE: 'Belum Menikah',
  MARRIED: 'Menikah',
  DIVORCED: 'Cerai',
  WIDOWED: 'Duda / Janda',
};

export const bloodTypeLabels: Record<string, string> = {
  A: 'A',
  B: 'B',
  AB: 'AB',
  O: 'O',
  UNKNOWN: 'Tidak Diketahui',
};

export const disabilityTypeLabels: Record<string, string> = {
  NONE: 'Tidak Ada',
  PHYSICAL: 'Disabilitas Fisik',
  VISUAL: 'Tunanetra',
  HEARING: 'Tunarungu / Tunawicara',
  MENTAL: 'Gangguan Mental / Psikososial',
  INTELLECTUAL: 'Disabilitas Intelektual',
  MULTIPLE: 'Disabilitas Ganda',
  OTHER: 'Lainnya',
};

export const citizenshipLabels: Record<string, string> = {
  WNI: 'Warga Negara Indonesia',
  WNA: 'Warga Negara Asing',
};

export const populationStatusLabels: Record<string, string> = {
  PERMANENT: 'Warga Tetap',
  TEMPORARY: 'Pendatang Sementara',
  MOVED_OUT: 'Sudah Pindah',
  DECEASED: 'Meninggal Dunia',
};

export const familyRelationshipLabels: Record<FamilyRelationship, string> = {
  HEAD: 'Kepala Keluarga',
  SPOUSE: 'Istri / Suami',
  CHILD: 'Anak',
  PARENT: 'Orang Tua',
  SIBLING: 'Saudara',
  OTHER: 'Lainnya',
};
export const RevenueCategoryOptions: Record<RevenueCategory, string> = {
  OWN_SOURCE: 'PAD',
  TRANSFER: 'Transfer',
  OTHER: 'Lain-lain',
};

export const ExpemseSectorOptions: Record<ExpenseSector, string> = {
  GOVERNMENT_ADMIN: 'Pemerintahan',
  DEVELOPMENT: 'Pembangunan',
  COMMUNITY_GUIDANCE: 'Pembinaan',
  EMERGENCY: 'Pemberdayaan',
  EMPOWERMENT: 'Bencana / Mendesak',
};

export const positionTypeLabels: Record<StaffPositionType, string> = {
  TOP: 'Kepala Desa',
  MIDDLE: 'Sekdes / Kaur / Kasi',
  LOWER: 'Kadus / Pengawas',
  STAFF: 'Pelaksana',
  OTHER: 'Lainnya',
};
