'use server';

import prisma from '@/lib/prisma';
import { getVillageConfigQuery, VillageConfigType } from './villageConfig.type';
import { getCurrentUser } from '@/app/_lib/root.action';
import {
  villageConfigUpdateSchema,
  villageConfigUpdateValues,
} from './villageConfig.zod';

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

// --- HANDLE UPDATE VILLAGE CONFIG ---
export async function updateVillageConfig(
  inputData: villageConfigUpdateValues,
): Promise<VillageConfigType> {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  // 🧩 Validasi input & konversi string kosong → null, dsb
  const parsedData = villageConfigUpdateSchema.parse(inputData);

  try {
    // Ambil villageConfig pertama (karena cuma satu)
    const existing = await prisma.villageConfig.findFirst();
    if (!existing) {
      throw new Error('Village configuration not found');
    }

    // Update record
    const updated = await prisma.villageConfig.update({
      where: { id: existing.id },
      data: parsedData,
    });

    return updated;
  } catch (err) {
    console.error('updateVillageConfig =>', err);
    throw new Error('Failed to update village configuration');
  }
}
