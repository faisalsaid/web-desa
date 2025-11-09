import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Import semua seed file
import seedAdminUser from './seeds/adminUser';

async function main() {
  console.log('⏳ Running Seed...');

  await seedAdminUser(prisma);

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
