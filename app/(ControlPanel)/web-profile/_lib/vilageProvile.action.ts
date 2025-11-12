'use server';

import prisma from '@/lib/prisma';
import {
  getVillageProfileQuery,
  VillageProfileType,
} from '../_lib/vilageProvile.type';
import { auth } from '@/auth';
import { VillageProfileFormValues } from './villageProvile.zod';

export const hasLoggedin = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  return session; // ✅ return session agar bisa dipakai di action
};

export async function getVillageProfile(): Promise<VillageProfileType | null> {
  await hasLoggedin();
  try {
    const data = await prisma.villageProfile.findFirst(getVillageProfileQuery);
    return data;
  } catch (err) {
    throw new Error('Failed to fetch village profile');
  }
}

// UPDATE ONLY (NO CREATE)
export async function updateVillageProfile(payload: VillageProfileFormValues) {
  await hasLoggedin();

  try {
    // Ambil village profile tunggal
    const existing = await prisma.villageProfile.findFirst();

    if (!existing) {
      // Tidak boleh create, hanya update
      throw new Error(
        'Village profile not found. Please ensure the seed has been run.',
      );
    }

    // Update record
    const updated = await prisma.villageProfile.update({
      where: { id: existing.id },
      data: {
        ...payload,
      },
    });

    return { ok: true, data: updated };
  } catch (err) {
    console.error(err);
    throw new Error('Failed to update village profile');
  }
}

export const uploadVillageLogo = async () => {
  await hasLoggedin();
};
