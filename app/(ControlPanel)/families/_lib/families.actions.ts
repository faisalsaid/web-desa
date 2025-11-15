'use server';

import prisma from '@/lib/prisma';

export async function searchResidentsHeadFamilyNull(query: string) {
  if (!query || query.trim().length === 0) return [];

  const residents = await prisma.resident.findMany({
    where: {
      isActive: true,
      headOfFamilyFor: null,
      fullName: { contains: query, mode: 'insensitive' },
    },
    take: 20, // batasi hasil
    select: {
      id: true,
      fullName: true,
      nik: true,
    },
  });

  return residents;
}
