import prisma from '@/lib/prisma'; // pastikan prisma client sudah di-setup
import {
  GetVillageConfigQuery,
  GetVillageConfigType,
  QGetAllStaff,
  TStaffForHome,
} from './home.type';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getImageUrl } from '@/lib/b2storage.action';

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

export async function getHeadOfVillage() {
  const headOfVillage = await prisma.staff.findFirst({
    where: { isActive: true, positionType: { positionType: 'TOP' } },
  });

  let signedUlr: string | null = null;

  if (headOfVillage?.imageKey) {
    signedUlr = await getImageUrl(headOfVillage.imageKey);
  }

  return {
    ...headOfVillage,
    imageUrl: signedUlr ?? '',
  };
}

export async function getAllStaff(): Promise<TStaffForHome[]> {
  const staff = prisma.staff.findMany({
    ...QGetAllStaff,
  });

  const result = await Promise.all(
    (
      await staff
    ).map(async (s) => {
      const signedUlr = await getImageUrl(s.imageKey);
      return {
        ...s,
        imageUrl: signedUlr,
      };
    }),
  );

  return result;
}
