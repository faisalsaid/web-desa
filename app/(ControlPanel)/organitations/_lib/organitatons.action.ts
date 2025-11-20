// app/organisasi/organization.action.ts
'use server';

import prisma from '@/lib/prisma';

import { revalidatePath } from 'next/cache'; // opsional, untuk revalidate page
import {
  StaffPositionTypeCreateInput,
  StaffPositionTypeCreateSchema,
} from './organitaions.zod';
import { getCurrentUser } from '@/app/_lib/root.action';
import slugify from 'slugify';
import { Prisma } from '@prisma/client';
import {
  getStaffPositionTypeDetailQuery,
  StaffPositionType,
} from './organitations.type';

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
    const slug = slugify(parsedData.name, { lower: true, strict: true });
    const newPosition = await prisma.staffPosition.create({
      data: {
        name: parsedData.name,
        slug,
        description: parsedData.description ?? null,
      },
    });

    return {
      success: true,
      data: newPosition,
      message: `Selamat! Jabatan ${parsedData.name} berhasil ditambahkan`,
    };
  } catch (error) {
    // console.log(error);

    // Tangani duplicate slug / constraint violation
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Pastikan error.meta ada dan bertipe object dengan property target
      if (
        error.code === 'P2002' &&
        typeof error.meta === 'object' &&
        error.meta !== null &&
        'target' in error.meta &&
        Array.isArray((error.meta as { target: string[] }).target)
      ) {
        return {
          success: false,
          message: `Ops! Jabatan ${parsedData.name} sudah ada! `,
        };
      }
    }
    return {
      success: false,
      message: `Ops! Gagal menambah jabatan ${parsedData.name}! `,
    };
  }

  // Opsional: revalidate path yang menampilkan daftar posisi
  //   revalidatePath('/organisasi/settings');
}

// HANDLE GET ALL STAFF POSSITION
/**
 * Server Action: ambil semua data StaffPositionType
 */
export async function getAllStaffPositionsTypes() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const staffPositions = await prisma.staffPosition.findMany({
    ...getStaffPositionTypeDetailQuery,
  });

  return staffPositions;
}
