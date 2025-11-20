// app/organisasi/organization.action.ts
'use server';

import prisma from '@/lib/prisma';

import { revalidatePath } from 'next/cache'; // opsional, untuk revalidate page
import {
  StaffPositionTypeCreateInput,
  StaffPositionTypeCreateSchema,
} from './organitaions.zod';
import { getCurrentUser } from '@/app/_lib/root.action';

/**
 * Server Action: buat StaffPositionType baru
 * @param data input yang tervalidasi oleh Zod
 * @returns StaffPositionType baru dari database
 */

interface CreateStaffPositionReturn {
  success: boolean;
  data?: any;
  message: string;
}

export async function createStaffPositionType(
  data: StaffPositionTypeCreateInput,
): Promise<CreateStaffPositionReturn> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  // Validasi input pakai Zod
  const parsedData = StaffPositionTypeCreateSchema.parse(data);
  try {
    // Simpan ke database
    const newPosition = await prisma.staffPositionType.create({
      data: {
        name: parsedData.name,
        description: parsedData.description ?? null,
      },
    });

    return {
      success: true,
      data: newPosition,
      message: `Selamat! Jabatan ${parsedData.name} berhasil ditambahkan`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Ops! Gagal menambah jabatan ${parsedData.name}! `,
    };
  }

  // Opsional: revalidate path yang menampilkan daftar posisi
  //   revalidatePath('/organisasi/settings');
}
