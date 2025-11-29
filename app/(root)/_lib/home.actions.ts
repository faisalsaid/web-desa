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

export async function getHeadOfVIllage() {
  try {
    const headOfVillage = await prisma.staff.findFirst({
      where: { isActive: true, positionType: { positionType: 'TOP' } },
    });
    return headOfVillage;
  } catch (error) {
    console.error('Failed to fetch head of village:', error);
    return null;
  }
}
