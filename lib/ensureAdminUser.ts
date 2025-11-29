// lib/ensureAdminUser.ts
import { PrismaClient, UserRole } from '@prisma/client';
import { hashSync } from 'bcrypt-ts';

const prisma = new PrismaClient();
let initialized = false; // Agar hanya run sekali per server instance

export async function ensureAdminUser() {
  if (initialized) return; // Hindari multiple init
  initialized = true;

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.log('⚠️ ADMIN_EMAIL / ADMIN_PASSWORD belum diset.');
    return;
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    console.log('✔️ Admin user sudah ada.');
    return;
  }

  console.log('⏳ Membuat admin user...');

  const hashedPassword = hashSync(password, 10);

  await prisma.user.create({
    data: {
      name: 'Administrator',
      email,
      hashedPassword,
      role: UserRole.ADMIN,
    },
  });

  console.log('✅ Admin user berhasil dibuat:', email);
}
