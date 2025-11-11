'use server';

import prisma from '@/lib/prisma';
import {
  getVillageProfileQuery,
  VillageProfileType,
} from '../_lib/vilageProvile.type';
import { auth } from '@/auth';
import { VillageProfileFormValues } from './villageProvile.zod';

export async function getVillageProfile(): Promise<VillageProfileType | null> {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  try {
    const data = await prisma.villageProfile.findFirst(getVillageProfileQuery);
    return data;
  } catch (err) {
    console.log('getVillageProfile =>', err);
    throw new Error('Failed to fetch village profile');
  }
}

// UPDATE ONLY (NO CREATE)
export async function updateVillageProfile(payload: VillageProfileFormValues) {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

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
