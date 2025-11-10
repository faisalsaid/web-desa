import { Prisma } from '@prisma/client';

export const getVillageProfileQuery =
  Prisma.validator<Prisma.VillageProfileFindFirstArgs>()({
    select: {
      id: true,
      name: true,
      logo: true,
      description: true,
      vision: true,
      mission: true,
      country: true,
      province: true,
      regency: true,
      district: true,
      village: true,
      latitude: true,
      longitude: true,
      areaKm2: true,
      elevation: true,
      population: true,
      northBorder: true,
      eastBorder: true,
      southBorder: true,
      westBorder: true,
      mapUrl: true,
      updatedAt: true,
    },
  });

export type VillageProfileType = Prisma.VillageProfileGetPayload<
  typeof getVillageProfileQuery
>;
