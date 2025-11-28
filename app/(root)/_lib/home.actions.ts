import prisma from '@/lib/prisma'; // pastikan prisma client sudah di-setup
import { GetVillageConfigQuery, GetVillageConfigType } from './home.type';

// ✅ Server Action
export async function getVillageConfig(): Promise<GetVillageConfigType | null> {
  try {
    const village = await prisma.villageConfig.findFirst(GetVillageConfigQuery);
    return village;
  } catch (error) {
    console.error('Failed to fetch village config:', error);
    return null;
  }
}
