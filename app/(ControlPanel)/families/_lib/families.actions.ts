'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { FamilyCreateInput, FamilyCreateSchema } from './families.zod';
import {
  FamiliesDataTableType,
  FamilyToUpdateType,
  FamilyType,
  getFamiliesDataTableQuery,
  getFamilyDetailsQuery,
  getFamilyToUpdateQuery,
} from './families.type';

import type { FamilyUpdateInput, MemberInput } from './families.zod';
import { getCurrentUser } from '@/app/_lib/root.action';
import { Prisma } from '@prisma/client';

// export async function searchResidentsHeadFamilyNull(query: string) {
//   if (!query || query.trim().length === 0) return [];

//   const residents = await prisma.resident.findMany({
//     where: {
//       isActive: true,
//       headOfFamilyFor: null,
//       fullName: { contains: query, mode: 'insensitive' },
//     },
//     take: 20, // batasi hasil
//     select: {
//       id: true,
//       fullName: true,
//       nik: true,
//     },
//   });

//   return residents;
// }

export async function searchResidentsForMember(
  query: string,
  excludeIds: number[] = [],
) {
  if (!query || query.trim().length === 0) return [];

  const residents = await prisma.resident.findMany({
    where: {
      isActive: true,
      id: { notIn: excludeIds },
      headOfFamilyFor: null,
      familyId: null,

      OR: [
        { fullName: { contains: query, mode: 'insensitive' } },
        { nik: { contains: query, mode: 'insensitive' } },
      ],
    },
    take: 20, // batasi hasil untuk performa
    select: {
      id: true,
      fullName: true,
      nik: true,
    },
  });

  return residents;
}

export async function createFamilyWithMembers(data: FamilyCreateInput) {
  // ---- 1. Temukan HEAD dalam payload ----
  const head = data.members.find((m) => m.familyRelationship === 'HEAD');

  if (!head) {
    return { success: false, error: 'Kepala keluarga wajib dipilih.' };
  }

  // ---- 2. Kumpulkan semua residentId ----
  const memberIds = data.members.map((m) => m.residentId);

  // ---- 3. Validasi duplikasi payload ----
  if (new Set(memberIds).size !== memberIds.length) {
    return { success: false, error: 'Terdapat anggota duplikat.' };
  }

  // ---- 4. Ambil data resident dari DB untuk validasi ----
  const residents = await prisma.resident.findMany({
    where: { id: { in: memberIds } },
    select: {
      id: true,
      isActive: true,
      familyId: true,
      headOfFamilyFor: true,
    },
  });

  // ---- 5. Validasi semua resident valid ----
  if (residents.length !== memberIds.length) {
    return { success: false, error: 'Beberapa warga tidak ditemukan.' };
  }

  for (const r of residents) {
    if (!r.isActive) {
      return {
        success: false,
        error: `Warga dengan ID ${r.id} tidak aktif.`,
      };
    }

    if (r.familyId !== null) {
      return {
        success: false,
        error: `Warga dengan ID ${r.id} sudah masuk keluarga lain.`,
      };
    }
  }

  // ---- 6. Validasi head belum kepala keluarga lain ----
  const headDb = residents.find((x) => x.id === head.residentId);
  if (headDb?.headOfFamilyFor !== null) {
    return {
      success: false,
      error: 'Resident ini sudah menjadi kepala keluarga lain.',
    };
  }

  // ---- 7. Buat keluarga + update semua member ATOMIC ----

  try {
    const result = await prisma.$transaction(async (tx) => {
      // --- 7A. Buat family ---
      const family = await tx.family.create({
        data: {
          familyCardNumber: data.familyCardNumber,
          address: data.address,
          dusun: data.dusun,
          rw: data.rw,
          rt: data.rt,
          headOfFamilyId: head.residentId,
        },
      });

      // --- 7B. Update semua anggota ---
      await Promise.all(
        data.members.map((m) =>
          tx.resident.update({
            where: { id: m.residentId },
            data: {
              familyId: family.id,
              familyRelationship: m.familyRelationship,
            },
          }),
        ),
      );

      return family;
    });

    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Gagal membuat keluarga.' };
  }
}

export async function getFamilyDetails(
  urlId: string,
): Promise<FamilyType | null> {
  try {
    const family = await prisma.family.findUnique({
      where: { urlId },
      ...getFamilyDetailsQuery,
    });

    return family;
  } catch (error) {
    console.error('Error fetching family details:', error);
    return null;
  }
}

export async function checkFamilyCardNumberExists(
  kk: string,
): Promise<boolean> {
  if (!kk || kk.trim().length === 0) return false;

  const exists = await prisma.family.findFirst({
    where: { familyCardNumber: kk },
    select: { id: true },
  });

  return !!exists;
}

export async function getFamilyToUpdate(
  urlId: string,
): Promise<FamilyToUpdateType | null> {
  try {
    const family = await prisma.family.findUnique({
      where: { urlId },
      ...getFamilyToUpdateQuery,
    });

    return family;
  } catch (error) {
    console.error('Error fetching family details:', error);
    return null;
  }
}

export async function updateFamilyWithMembers(
  payload: FamilyUpdateInput,
): Promise<{ success: boolean; data?: typeof payload; error?: string }> {
  const { id, members, ...familyData } = payload;

  if (!id) {
    return { success: false, error: 'Family ID wajib untuk update.' };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1️⃣ Update data utama family
      const updatedFamily = await tx.family.update({
        where: { id },
        data: familyData,
      });

      // 2️⃣ Reset semua resident yang terkait family ini
      await tx.resident.updateMany({
        where: { familyId: id },
        data: { familyId: null, familyRelationship: null },
      });

      // 3️⃣ Update member baru
      const memberUpdates = members?.map((member: MemberInput) =>
        tx.resident.update({
          where: { id: member.residentId },
          data: {
            familyId: id,
            familyRelationship: member.familyRelationship,
          },
        }),
      );

      if (memberUpdates) {
        await Promise.all(memberUpdates);
      }

      // 4️⃣ Update kepala keluarga
      const head = members?.find((m) => m.familyRelationship === 'HEAD');
      if (head) {
        await tx.family.update({
          where: { id },
          data: { headOfFamilyId: head.residentId },
        });
      } else {
        await tx.family.update({
          where: { id },
          data: { headOfFamilyId: null },
        });
      }

      return updatedFamily;
    });

    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Gagal memperbarui keluarga.' };
  }
}

// app/_lib/families.actions.ts

interface FetchFamiliesParams {
  page?: number;
  limit?: number;
  search?: string;
  pageSize?: number;
}

export const fetchFamilies = async ({
  page = 1,
  pageSize = 10,
  search = '',
}: FetchFamiliesParams): Promise<{
  success: boolean;
  data?: FamiliesDataTableType[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  error?: string;
}> => {
  try {
    // Filter untuk search
    const where: Prisma.FamilyWhereInput = search
      ? {
          OR: [
            {
              familyCardNumber: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
            {
              headOfFamily: {
                fullName: {
                  contains: search,
                  mode: 'insensitive' as Prisma.QueryMode,
                },
              },
            },
            // {
            //   address: {
            //     contains: search,
            //     mode: 'insensitive' as Prisma.QueryMode,
            //   },
            // },
            // {
            //   dusun: {
            //     contains: search,
            //     mode: 'insensitive' as Prisma.QueryMode,
            //   },
            // },
            // {
            //   rw: { contains: search, mode: 'insensitive' as Prisma.QueryMode },
            // },
            // {
            //   rt: { contains: search, mode: 'insensitive' as Prisma.QueryMode },
            // },
            // {
            //   members: {
            //     some: {
            //       fullName: {
            //         contains: search,
            //         mode: 'insensitive' as Prisma.QueryMode,
            //       },
            //     },
            //   },
            // },
          ],
        }
      : {};

    // Total record matching filter
    const total = await prisma.family.count({ where });

    // Ambil data dengan pagination
    const families = await prisma.family.findMany({
      ...getFamiliesDataTableQuery, // pastikan query ini sesuai kebutuhan
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { id: 'desc' },
    });

    return {
      success: true,
      data: families,
      total,
      page,
      limit: pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'Gagal mengambil data table',
    };
  }
};
