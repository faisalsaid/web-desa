'use server';

import prisma from '@/lib/prisma';
import {
  ResidentCreateInput,
  ResidentCreateSchema,
  ResidentUpdateInput,
  ResidentUpdateSchema,
} from './residents.zod';
import { getCurrentUser } from '@/app/_lib/root.action';
import { getResidentDetailQuery, ResidentType } from './residents.type';

// -- HANDLE CREATE RESIDENT -- //
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

// -- HANDEL GET RESIDENT DETAIL BY ID --//

export async function getResidentDetails(
  urlId: string,
): Promise<ResidentType | null> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  try {
    const resident = await prisma.resident.findUnique({
      where: { urlId },
      ...getResidentDetailQuery, // memastikan type-safe
    });

    return resident;
  } catch (error) {
    console.error('Gagal mengambil detail resident:', error);
    return null;
  }
}

export async function updateResident(
  id: number,
  formData: ResidentUpdateInput,
) {
  try {
    // 1. Validasi Zod (AMAN, pakai schema .partial())
    const parsed = ResidentUpdateSchema.safeParse(formData);

    if (!parsed.success) {
      return {
        success: false,
        message: 'Validasi gagal',
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const data = parsed.data;

    // 2. Update ke Prisma
    const updatedResident = await prisma.resident.update({
      where: { id },
      data,
    });

    return {
      success: true,
      message: 'Data penduduk berhasil diperbarui',
      data: updatedResident,
    };
  } catch (error) {
    console.error('Error update resident:', error);

    return {
      success: false,
      message: 'Terjadi kesalahan saat memperbarui data penduduk',
    };
  }
}
