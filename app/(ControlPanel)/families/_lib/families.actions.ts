'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { FamilyCreateInput, FamilyCreateSchema } from './families.zod';

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

// HANDLE CREATE FAMILY
export async function createFamily(data: FamilyCreateInput) {
  try {
    const parsed = FamilyCreateSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || 'Data tidak valid',
      };
    }

    const { familyCardNumber, address, dusun, rw, rt, headOfFamilyId } =
      parsed.data;

    // Cek duplikasi Kartu Keluarga
    const existFamily = await prisma.family.findUnique({
      where: { familyCardNumber },
      select: { id: true },
    });

    if (existFamily) {
      return {
        success: false,
        error: 'Nomor KK sudah terdaftar',
      };
    }

    // Validasi kepala keluarga
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

      if (!resident) {
        return {
          success: false,
          error: 'Kepala keluarga tidak ditemukan',
        };
      }

      if (!resident.isActive) {
        return {
          success: false,
          error: 'Resident ini tidak aktif',
        };
      }

      if (resident.headOfFamilyFor) {
        return {
          success: false,
          error: 'Resident ini sudah menjadi kepala keluarga di keluarga lain',
        };
      }

      if (resident.familyId) {
        return {
          success: false,
          error: 'Resident ini sudah menjadi anggota keluarga lain',
        };
      }

      validatedHeadId = resident.id;
    }

    // ================================
    // 1️⃣ Buat keluarga baru
    // ================================
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

    // ================================
    // 2️⃣ Kepala keluarga otomatis jadi anggota
    // ================================
    if (validatedHeadId) {
      await prisma.resident.update({
        where: { id: validatedHeadId },
        data: {
          familyId: createdFamily.id, // kepala keluarga menjadi member
        },
      });
    }

    // Refresh list families
    revalidatePath('/families');

    return {
      success: true,
      data: createdFamily,
    };
  } catch (error) {
    console.error('Create Family Error:', error);

    return {
      success: false,
      error: 'Terjadi kesalahan pada server',
    };
  }
}
