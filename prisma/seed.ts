import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Import semua seed file
import seedAdminUser from './seeds/adminUser';
import seedVillageConfige from './seeds/villageConfig';
import seedResident from './seeds/resident';

async function main() {
  console.log('⏳ Running Seed...');

  await seedAdminUser(prisma);
  await seedVillageConfige(prisma);
  await seedResident(prisma, { count: 20 });

  console.log('✅ ALL SEED COMPLETED');
}

main()
  .catch((e) => {
    console.error('❌ Seed Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
