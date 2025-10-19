'use server';

import prisma from '@/lib/prisma';
import { hashSync } from 'bcrypt-ts';
import { generatePasswordResetToken } from './tokens';
import { sendPasswordResetEmail } from './mailer';

// Handle set password
export async function setPassword({
  token,
  password,
}: {
  token: string;
  password: string;
}) {
  const record = await prisma.verificationToken.findFirst({
    where: { token },
  });

  if (!record || record.expires < new Date()) {
    return { ok: false, error: 'Invalid or expired token' };
  }

  const hashed = hashSync(password, 10);

  await prisma.user.update({
    where: { email: record.identifier },
    data: { hashedPassword: hashed },
  });

  // sekali pakai: hapus token
  await prisma.verificationToken.deleteMany({ where: { token } });

  return { ok: true };
}

// handle forgot password

export async function forgotPasswordAction(email: string) {
  try {
    // Cari user (silent, jangan kasih tahu ke UI kalau tidak ketemu)
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      // Hapus token lama user
      await prisma.passwordResetToken.deleteMany({
        where: { userId: user.id },
      });

      // Generate token baru
      const { rawToken, tokenHash, expiresAt } = generatePasswordResetToken();

      // Simpan ke DB
      await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash,
          expiresAt,
        },
      });

      // Kirim email reset password
      await sendPasswordResetEmail(user.email, rawToken, user.id);
    }

    // Return sukses generik (baik email ada atau tidak)
    return { success: true };
  } catch (error) {
    console.error('Forgot password error:', error);
    return { success: true }; // tetap return generik
  }
}
