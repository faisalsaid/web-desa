'use server';

import prisma from '@/lib/prisma';
import {
  getVillageProfileQuery,
  VillageProfileType,
} from '../_lib/vilageProvile.type';
import { auth } from '@/auth';

export async function getVillageProfile(): Promise<VillageProfileType | null> {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  try {
    const data = await prisma.villageProfile.findFirst(getVillageProfileQuery);
    return data;
  } catch (err) {
    throw new Error('Failed to fetch village profile');
  }
}
