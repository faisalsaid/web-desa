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
import { Prisma } from '@prisma/client';
import z, { ZodError } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { b2UploadImage } from '@/lib/b2storage.action';

// -- HANDLE CREATE RESIDENT -- //

// type ResidentJsonInput = Omit<z.infer<typeof ResidentCreateSchema>, 'image'> & {
//   imageUrl?: string | null; // Kita ganti 'image' jadi 'imageUrl' string opsional
// };
export async function createResident(
  input: ResidentCreateInput,
  formData: FormData,
) {
  console.log(input);
  console.log(formData);

  const { image, ...rest } = input;

  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const residentUrlId = uuidv4();
  const file = formData.get('file') as File | null;

  try {
    // 1️⃣ Validasi data pakai Zod
    const validatedData = ResidentCreateSchema.parse(rest);

    // 2️⃣ Simpan ke database
    let imageKey: string | null = null;
    if (file && file.size > 0) {
      // Upload dan dapatkan KEY (contoh: 'residents/abc-123/profile.jpg')
      imageKey = await b2UploadImage({
        file: file,
        folder: `residents/${residentUrlId}`,
        customFileName: 'profile.jpg',
      });
    }

    console.log(validatedData);
    console.log(imageKey);

    const newResident = await prisma.resident.create({
      data: {
        urlId: residentUrlId,
        ...validatedData,
        // Simpan KEY nya, bukan URL panjang
        // Pastikan kolom di DB namanya representatif, misal 'imageKey' atau tetap 'imageUrl' tidak masalah asalkan isinya string
        imageKey: imageKey,
      },
    });

    return { success: true, resident: newResident };
    //eslint-
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return { success: false, errors: error.issues };
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

// -- HANDLE UPDATE RESIDENT -- //
export async function updateResident(
  id: number,
  formData: ResidentUpdateInput,
) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

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

// -- HANDLE SOFT DELETE RESIDENT -- //
export async function deleteResident(id: number) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  try {
    await prisma.resident.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { success: true };
  } catch (error) {
    console.error('Delete resident failed:', error);
    return { success: false, message: 'Gagal menghapus penduduk' };
  }
}

// --- HANDLE GET ALL RESIDENT -- //

export async function getResidents({
  page = 1,
  limit = 10,
  search = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const where: Prisma.ResidentWhereInput = search
    ? {
        OR: [
          {
            fullName: {
              contains: search,
              mode: 'insensitive', // harus literal
            },
          },
          {
            nik: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }
    : {};

  const [items, total] = await Promise.all([
    prisma.resident.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.resident.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
