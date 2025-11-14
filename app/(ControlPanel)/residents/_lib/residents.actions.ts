'use server';

import prisma from '@/lib/prisma';
import { ResidentCreateInput, ResidentCreateSchema } from './residents.zod';
import { getCurrentUser } from '@/app/_lib/root.action';

export async function createResident(data: ResidentCreateInput) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  //   console.log('PAYLOAD CREATE RESIDENT =>', data);

  try {
    // 1️⃣ Validasi data pakai Zod
    const validatedData = ResidentCreateSchema.parse(data);

    // 2️⃣ Simpan ke database
    const newResident = await prisma.resident.create({
      data: validatedData,
    });

    return { success: true, resident: newResident };
  } catch (error: any) {
    console.error(error);

    if (error.name === 'ZodError') {
      return { success: false, errors: error.errors };
    }

    return { success: false, message: 'Terjadi kesalahan server' };
  }
}
