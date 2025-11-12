'use server';

import prisma from '@/lib/prisma';
import { getVillageConfigQuery, VillageConfigType } from './villageConfig.type';
import { getCurrentUser } from '@/app/_lib/root.action';

export async function getVillageConfig(): Promise<VillageConfigType | null> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  try {
    const data = await prisma.villageConfig.findFirst(getVillageConfigQuery);
    return data;
  } catch (err) {
    console.log('getVillageProfile =>', err);
    throw new Error('Failed to fetch village profile');
  }
}
