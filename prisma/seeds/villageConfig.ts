// prisma/seeds/villageProfile.ts

import { PrismaClient } from '@prisma/client';

export default async function seedVillageConfige(prisma: PrismaClient) {
  console.log('🌱 Seeding Village Profile...');

  // chek if data exist (agar tidak double)
  const existing = await prisma.villageConfig.findFirst();
  if (existing) {
    console.log('⚠️ Village Confige already exists, skip seeding.');
    return;
  }

  await prisma.villageConfig.create({
    data: {
      villageCode: '1234567890',
      villageName: 'Torino',
    },
  });

  console.log('✅ Village Confige Seeded');
}
