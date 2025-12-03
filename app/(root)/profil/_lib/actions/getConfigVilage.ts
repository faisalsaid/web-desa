// app/actions/village.ts
'use server';

import prisma from '@/lib/prisma'; // Sesuaikan path ke inisialisasi Prisma Client Anda

/**
 * Mendefinisikan Tipe Data Profil Desa yang Diperlukan.
 * Ini memastikan kita memiliki struktur data yang jelas dan type-safe
 * di sisi klien/komponen tanpa membawa seluruh model VillageConfig.
 */
export type VillageProfile = {
  villageName: string;
  villageCode: string;
  provinceName: string | null;
  regencyName: string | null;
  districtName: string | null;
  officeAddress: string | null;
  postalCode: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  establishedYear: number | null;
  description: string | null;
  areaSize: number | null;
  areaUnit: string | null;
  populationTotal: number | null;
  hamletCount: number | null;
  rwCount: number | null;
  rtCount: number | null;
  borderNorth: string | null;
  borderEast: string | null;
  borderSouth: string | null;
  borderWest: string | null;
  elevation: number | null;
  latitude: string | null; // Gunakan string untuk Decimal saat diakses dari Prisma
  longitude: string | null; // Gunakan string untuk Decimal saat diakses dari Prisma
  logoUrl: string | null;
  officePhotoUrl: string | null;
  vision: string | null;
  mission: string | null;
  slogan: string | null;
};

/**
 * Mengambil data profil desa dari database.
 * @returns Promise<VillageProfile | null> Data profil desa atau null jika tidak ditemukan.
 */
export async function getVillageProfil(): Promise<VillageProfile | null> {
  // Tambahkan 'use server' untuk menandai ini sebagai Next.js Server Action/Function

  try {
    const config = await prisma.villageConfig.findFirst({
      where: { isActive: true },
      select: {
        villageName: true,
        villageCode: true,
        provinceName: true,
        regencyName: true,
        districtName: true,
        officeAddress: true,
        postalCode: true,
        phone: true,
        email: true,
        website: true,
        establishedYear: true,
        description: true,
        areaSize: true,
        areaUnit: true,
        populationTotal: true,
        hamletCount: true,
        rwCount: true,
        rtCount: true,
        borderNorth: true,
        borderEast: true,
        borderSouth: true,
        borderWest: true,
        elevation: true,
        latitude: true,
        longitude: true,
        logoUrl: true,
        officePhotoUrl: true,
        vision: true,
        mission: true,
        slogan: true,
      },
    });

    if (!config) {
      console.log('Village configuration not found.');
      return null;
    }

    // Mengubah tipe Decimal dari Prisma ke string yang sesuai dengan VillageProfile
    const profile: VillageProfile = {
      ...config,
      latitude: config.latitude?.toString() ?? null,
      longitude: config.longitude?.toString() ?? null,
    };

    return profile;
  } catch (error) {
    console.error('Error fetching village profile:', error);
    // Dalam production, Anda mungkin ingin mencatat kesalahan ini ke layanan log eksternal
    return null;
  }
}
