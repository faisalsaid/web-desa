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
import { Prisma, StaffPositionType } from '@prisma/client';
import {
  getStaffDetailsQuery,
  getStaffPositionTypeDetailQuery,
  StaffType,
} from './organitations.type';

import { v4 as uuidv4 } from 'uuid';
import { b2UploadImage } from '@/lib/b2storage.action';

// HANDLE CREAT STAFF POSITIONS =================================================================

// get staffpositon to parentPositionId option field
export async function getStaffPositionOptions() {
  try {
    const positions = await prisma.staffPosition.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return positions;
  } catch (error) {
    console.error('Failed to fetch staff positions:', error);
    throw new Error('Gagal mengambil daftar jabatan.');
  }
}

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
        isUnique: parsedData.isUnique,
        positionType: parsedData.positionType,
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

  // Custom priority mapping
  const priority: Record<StaffPositionType, number> = {
    TOP: 1,
    MIDDLEUP: 2,
    MIDDLE: 3,
    LOWER: 4,
    STAFF: 5,
    OTHER: 6,
  };

  // Sort result based on custom priority
  const sortedPositions = staffPositions.sort(
    (a, b) => priority[a.positionType] - priority[b.positionType],
  );

  return sortedPositions;
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
        isUnique: parsedData.isUnique,
        positionType: parsedData.positionType,
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

// const parsed: ZodSafeParseResult<{
//     positionTypeId: number;
//     name: string;
//     startDate: Date;
//     residentId?: number | null | undefined;
//     endDate?: Date | null | undefined;
//     isActive?: boolean | undefined;
//     image?: string | File | null | undefined;
// }>

export async function createStaff(input: CreateStaffInput) {
  console.log(input);

  // 1. Validasi Zod
  const data = createStaffSchema.parse(input);

  // 2. Ambil info jabatan
  const position = await prisma.staffPosition.findUnique({
    where: { id: data.positionTypeId },
    select: { isUnique: true },
  });

  if (!position) {
    throw new Error('Jabatan tidak ditemukan.');
  }

  // 3. Jika jabatan tunggal → cek apakah sudah ada staff aktif
  if (position.isUnique) {
    const existingActive = await prisma.staff.findFirst({
      where: {
        positionTypeId: data.positionTypeId,
        isActive: true,
      },
      select: { id: true, residentId: true },
    });

    if (existingActive) {
      return {
        success: false,
        message:
          'Jabatan ini hanya boleh diisi oleh satu orang dan sudah terisi.',
      };
    }
  }

  // prepare form data for image upload

  const formData = new FormData();

  const { image, ...rest } = input;

  if (image instanceof File) {
    formData.append('file', image);
  }
  const staffUrlId = uuidv4();
  const file = formData.get('file') as File | null;

  // 2️⃣ Simpan ke database
  let imageKey: string | null = null;
  if (file && file.size > 0) {
    // Upload dan dapatkan KEY (contoh: 'staff/abc-123/profile.jpg')
    imageKey = await b2UploadImage({
      file: file,
      folder: `staff/${staffUrlId}`,
      customFileName: 'profile.jpg',
    });
  }

  // 4. Jika lulus, create staff
  const created = await prisma.staff.create({
    data: {
      urlId: staffUrlId,
      imageKey: imageKey,
      residentId: rest.residentId,
      positionTypeId: rest.positionTypeId,
      startDate: new Date(rest.startDate),
      endDate: rest.endDate ? new Date(rest.endDate) : null,
      isActive: rest.isActive ?? true,
      name: rest.name,
    },
  });

  return {
    success: true,
    message: 'Perangkatt berhasil ditambahkan.',
    data: created,
  };
}

// for options resident =============================================================================
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
  const types = await prisma.staffPosition.findMany({
    include: {
      staffAssignments: {
        where: { isActive: true },
        select: { id: true },
      },
    },
  });

  return types.map((t) => ({
    id: t.id,
    name: t.name,
    isUnique: t.isUnique,
    isFilled: t.isUnique && t.staffAssignments.length > 0,
  }));
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

export async function searchResidentToStaff(query: string) {
  return prisma.resident.findMany({
    where: {
      fullName: {
        contains: query,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      fullName: true,
      nik: true,
    },
    take: 10,
  });
}

// Handle delete staff (hard delete )============================================================================

type DeleteStaffResult =
  | { success: true; data: { id: number } }
  | { success: false; message: string };

export async function deleteStaff(staffId: number): Promise<DeleteStaffResult> {
  if (!staffId || Number.isNaN(staffId)) {
    return {
      success: false,
      message: 'Invalid staff ID',
    };
  }

  try {
    const deleted = await prisma.staff.delete({
      where: { id: staffId },
      select: { id: true }, // batasi return agar aman
    });

    return {
      success: true,
      data: deleted,
    };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Failed to delete staff';

    return {
      success: false,
      message: errorMessage,
    };
  }
}

// =================================================================================================

// HANDLE UPDATE STAFF =============================================================================

export async function updateStaffAction(input: Partial<UpdateStaffInput>) {
  const data = updateStaffSchema.parse(input);

  try {
    const updated = await prisma.staff.update({
      where: { id: data.id },
      data: {
        residentId: data.residentId,
        positionTypeId: data.positionTypeId,
        name: data.name,
        startDate: new Date(data.startDate as Date),
        endDate: data.endDate ? new Date(data.endDate) : null,
        isActive: data.isActive ?? true,
      },
    });

    return { success: true, message: 'Berahasil update staf', data: updated };
    // eslint-disable-next-line
  } catch (error) {
    return { success: false, message: 'Gagal update staf' };
  }
}
// ==================================================================================================

// HANDLE STAFF ////////////////////////////////////////////////////////////////////////////////////////////

// Get all staffs detail with limit and pagination

export type GetStaffs = {
  success: boolean;
  data: StaffType[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  error?: string;
};

interface GetStaffsParams {
  page?: number;
  search?: string;
  pageSize?: number;
}

export async function getStaffs({
  page = 1,
  pageSize = 10,
  search = '',
}: GetStaffsParams): Promise<GetStaffs | null> {
  const skip = (page - 1) * pageSize;

  const where: Prisma.StaffWhereInput = search
    ? {
        OR: [
          { resident: { fullName: { contains: search, mode: 'insensitive' } } },
          { positionType: { name: { contains: search, mode: 'insensitive' } } },
          { name: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {};

  const [total, staffs] = await prisma.$transaction([
    prisma.staff.count({ where }),
    prisma.staff.findMany({
      where,
      skip,
      take: pageSize,
      // distinct: ['residentId'],
      ...getStaffDetailsQuery,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return {
    success: true,
    data: staffs,
    total,
    page,
    totalPages: Math.ceil(total / pageSize),
  };
}

//  ////////////////////////////////////////////////////////////////////////////////////////////
