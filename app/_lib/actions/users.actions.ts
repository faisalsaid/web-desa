'use server';

import prisma from '@/lib/prisma';

export async function getCurrentUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        name: true,
        email: true,
        // Tambahkan field lain yang Anda butuhkan
        role: true,
        // ...
      },
    });
    return user;
  } catch (error) {
    console.error('Gagal mengambil data pengguna:', error);
    return null;
  }
}
