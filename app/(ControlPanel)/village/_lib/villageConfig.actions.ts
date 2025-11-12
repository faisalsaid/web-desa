'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { getVillageConfigQuery, VillageConfigType } from './villageConfig.type';

export async function getVillageConfig(): Promise<VillageConfigType | null> {
  const session = await auth();

  if (!session?.user) {
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
