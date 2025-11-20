// app/organisasi/organization.action.ts
'use server';

import prisma from '@/lib/prisma';

import {
  CreateStaffInput,
  createStaffSchema,
  StaffPositionTypeCreateInput,
  StaffPositionTypeCreateSchema,
  UpdateStaffInput,
  updateStaffSchema,
} from './organitaions.zod';
import { getCurrentUser } from '@/app/_lib/root.action';
import slugify from 'slugify';
import { Prisma } from '@prisma/client';
import { getStaffPositionTypeDetailQuery } from './organitations.type';

/**
 * Server Action: buat StaffPositionType baru
 * @param data input yang tervalidasi oleh Zod
 * @returns StaffPositionType baru dari database
 */

interface CreateStaffPositionReturn {
  success: boolean;
  data?: {
    description: string | null;
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
  };
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

/**
 * Interface return untuk Server Action delete StaffPositionType
 */
export interface DeleteStaffPositionReturn {
  success: boolean;
  message: string;
}

/**
 * Server Action: hapus StaffPositionType berdasarkan id
 */
export async function deleteStaffPositionType(
  id: number,
): Promise<DeleteStaffPositionReturn> {
  'use server';

  try {
    // Pastikan jabatan ada sebelum delete
    const existing = await prisma.staffPosition.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: 'Jabatan tidak ditemukan',
      };
    }

    // Hapus jabatan
    await prisma.staffPosition.delete({
      where: { id },
    });

    return {
      success: true,
      message: `Jabatan "${existing.name}" berhasil dihapus`,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: 'Ops! Gagal menghapus jabatan',
    };
  }
}

export async function updateStaffPosition(
  id: number,
  data: StaffPositionTypeCreateInput,
): Promise<CreateStaffPositionReturn> {
  try {
    const parsedData = StaffPositionTypeCreateSchema.parse(data);

    const slug = slugify(parsedData.name, { lower: true, strict: true });

    const updated = await prisma.staffPosition.update({
      where: { id },
      data: {
        name: parsedData.name,
        description: parsedData.description ?? null,
        slug,
      },
    });

    return {
      success: true,
      data: updated,
      message: `Jabatan "${parsedData.name}" berhasil diperbarui`,
    };
  } catch (error) {
    console.log(error);
    // Tangani duplicate slug dll
    return { success: false, message: 'Ops! Gagal memperbarui jabatan' };
  }
}

// HANDLE CREATE STAFF =============================================================================

export async function createStaffAction(input: CreateStaffInput) {
  const data = createStaffSchema.parse(input);

  return prisma.staff.create({
    data: {
      residentId: data.residentId,
      positionTypeId: data.positionTypeId,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      isActive: data.isActive ?? true,

      // organizationUnit: data.organizationUnitId
      //   ? { connect: { id: data.organizationUnitId } }
      //   : undefined,
    },
  });
}

// for options resident
export async function getResidentsToStaffFormOptions() {
  return prisma.resident.findMany({
    select: {
      id: true,
      fullName: true,
    },
    orderBy: {
      fullName: 'asc',
    },
  });
}

// for options resident
export async function getStaffPositionToStaffFormOptions() {
  return prisma.staffPosition.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

// for options resident
// export async function getOrganitationUnitToStaffFormOptions() {
//   return prisma.organizationUnit.findMany({
//     select: {
//       id: true,
//       name: true,
//     },
//     orderBy: {
//       name: 'asc',
//     },
//   });
// }

// =================================================================================================

// HANDLE UPDATE STAFF =============================================================================

export async function updateStaffAction(input: UpdateStaffInput) {
  const data = updateStaffSchema.parse(input);

  return prisma.staff.update({
    where: { id: data.id },
    data: {
      residentId: data.residentId,
      positionTypeId: data.positionTypeId,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      isActive: data.isActive ?? true,

      // organizationUnit:
      //   data.organizationUnitId === null
      //     ? { disconnect: true }
      //     : { connect: { id: data.organizationUnitId } },
    },
  });
}
// ==================================================================================================
