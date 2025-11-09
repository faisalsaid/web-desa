// prisma/seeds/adminUser.ts

import { PrismaClient, UserRole } from '@prisma/client';
import { hashSync } from 'bcrypt-ts';

export default async function seedAdminUser(prisma: PrismaClient) {
  console.log('👤 Seeding Admin User...');

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.log('❌ ADMIN_EMAIL atau ADMIN_PASSWORD belum diset di .env');
    return;
  }

  // Cek jika admin sudah ada
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log('⚠️ Admin user sudah ada, skip seeding.');
    return;
  }

  // Hash password
  const hashedPassword = hashSync(password, 10);

  await prisma.user.create({
    data: {
      name: 'Administrator',
      email,
      hashedPassword,
      role: UserRole.ADMIN,
    },
  });

  console.log('✅ Admin User Created:', email);
}
