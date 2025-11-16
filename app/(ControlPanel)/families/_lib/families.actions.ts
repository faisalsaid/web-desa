'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { FamilyCreateInput, FamilyCreateSchema } from './families.zod';
import { FamilyType } from './families.type';

export async function searchResidentsHeadFamilyNull(query: string) {
  if (!query || query.trim().length === 0) return [];

  const residents = await prisma.resident.findMany({
    where: {
      isActive: true,
      headOfFamilyFor: null,
      fullName: { contains: query, mode: 'insensitive' },
    },
    take: 20, // batasi hasil
    select: {
      id: true,
      fullName: true,
      nik: true,
    },
  });

  return residents;
}

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

// HANDLE CREATE FAMILY

type CreateFamilyResponse =
  | { success: true; data: { id: number; urlId: string } }
  | { success: false; error: string };

export async function createFamily(
  data: FamilyCreateInput,
): Promise<CreateFamilyResponse> {
  try {
    // 1️⃣ Validasi schema
    const parsed = FamilyCreateSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || 'Data tidak valid',
      };
    }

    const {
      familyCardNumber,
      address,
      dusun,
      rw,
      rt,
      headOfFamilyId,
      members,
    } = parsed.data;

    // 2️⃣ Cek duplikasi KK
    const existFamily = await prisma.family.findUnique({
      where: { familyCardNumber },
      select: { id: true },
    });
    if (existFamily) {
      return { success: false, error: 'Nomor KK sudah terdaftar' };
    }

    // 3️⃣ Validasi kepala keluarga
    let validatedHeadId: number | null = null;
    if (headOfFamilyId) {
      const resident = await prisma.resident.findUnique({
        where: { id: headOfFamilyId },
        select: {
          id: true,
          isActive: true,
          familyId: true,
          headOfFamilyFor: true,
        },
      });

      if (!resident)
        return { success: false, error: 'Kepala keluarga tidak ditemukan' };
      if (!resident.isActive)
        return { success: false, error: 'Resident ini tidak aktif' };
      if (resident.headOfFamilyFor)
        return {
          success: false,
          error: 'Resident ini sudah menjadi kepala keluarga di keluarga lain',
        };
      if (resident.familyId)
        return {
          success: false,
          error: 'Resident ini sudah menjadi anggota keluarga lain',
        };

      validatedHeadId = resident.id;
    }

    // 4️⃣ Buat keluarga baru
    const createdFamily = await prisma.family.create({
      data: {
        familyCardNumber,
        address,
        dusun,
        rw,
        rt,
        headOfFamilyId: validatedHeadId,
      },
    });

    // ===========================
    // 5️⃣ Tambahkan kepala keluarga sebagai member (relationship = HEAD)
    // ===========================
    if (validatedHeadId) {
      await prisma.resident.update({
        where: { id: validatedHeadId },
        data: {
          familyId: createdFamily.id,
          headOfFamilyFor: { connect: { id: createdFamily.id } },
        },
      });
    }

    // ===========================
    // 6️⃣ Tambahkan anggota dari payload (members)
    // ===========================
    if (members?.length) {
      for (const m of members) {
        // jangan masukkan kepala keluarga lagi
        if (m.residentId === validatedHeadId) continue;

        const resident = await prisma.resident.findUnique({
          where: { id: m.residentId },
          select: {
            id: true,
            isActive: true,
            familyId: true,
            headOfFamilyFor: true,
          },
        });

        if (!resident) continue; // skip jika tidak ditemukan
        if (!resident.isActive) continue; // skip jika tidak aktif
        if (resident.headOfFamilyFor) continue; // skip jika sudah kepala keluarga
        if (resident.familyId) continue; // skip jika sudah anggota keluarga lain

        await prisma.resident.update({
          where: { id: resident.id },
          data: { familyId: createdFamily.id },
        });
      }
    }

    // 7️⃣ Refresh cache Next.js
    revalidatePath('/families');

    return { success: true, data: createdFamily };
  } catch (error) {
    console.error('Create Family Error:', error);
    return { success: false, error: 'Terjadi kesalahan pada server' };
  }
}

// GET FAMILY DETAILS

export async function getFamilyDetails(
  urlId: string,
): Promise<FamilyType | null> {
  try {
    const family = await prisma.family.findUnique({
      where: { urlId },
      include: {
        headOfFamily: true,
        members: true,
      },
    });

    return family;
  } catch (error) {
    console.error('Error fetching family details:', error);
    return null;
  }
}
