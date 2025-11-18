// /prisma/seed/resident.ts
import { PrismaClient, Gender } from '@prisma/client';

interface SeedResidentOptions {
  count?: number;
}

// contoh nama manusiawi
const firstNamesMale = [
  'Adi',
  'Budi',
  'Cahyo',
  'Dedi',
  'Eko',
  'Fajar',
  'Galih',
  'Hendra',
  'Iwan',
  'Joko',
];
const firstNamesFemale = [
  'Ayu',
  'Bunga',
  'Citra',
  'Dewi',
  'Eka',
  'Fitri',
  'Gita',
  'Hani',
  'Indah',
  'Juli',
];
const lastNames = [
  'Pratama',
  'Santoso',
  'Wijaya',
  'Saputra',
  'Putri',
  'Gunawan',
  'Hidayat',
  'Nugroho',
  'Ramadhan',
  'Kusuma',
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const seedResident = async (
  prisma: PrismaClient,
  options?: SeedResidentOptions,
) => {
  const count = options?.count ?? 10;
  const residents = [];

  for (let i = 1; i <= count; i++) {
    const gender = i % 2 === 0 ? Gender.MALE : Gender.FEMALE;
    const firstName =
      gender === Gender.MALE
        ? getRandomItem(firstNamesMale)
        : getRandomItem(firstNamesFemale);
    const lastName = getRandomItem(lastNames);
    const fullName = `${firstName} ${lastName}`;

    // nik unik 16 digit
    const nikNumber = (1000000000000000 + i).toString().slice(0, 16);

    residents.push({
      nik: nikNumber,
      fullName,
      gender,
      birthPlace: null,
      birthDate: null,
      religion: null,
      education: null,
      occupation: null,
      maritalStatus: null,
      bloodType: null,
      disabilityType: null,
      citizenship: null,
      passportNumber: null,
      ethnicity: null,
      nationality: null,
      address: null,
      dusun: null,
      rw: null,
      rt: null,
      phone: null,
      email: null,
      familyRelationship: null,
      familyId: null,
      isActive: true,
    });
  }

  await prisma.resident.createMany({
    data: residents,
    skipDuplicates: true,
  });

  console.log(`✅ Seeded ${residents.length} Residents`);
};

export default seedResident;
