import { Prisma } from '@prisma/client';

// ✅ Validator untuk memilih fields yang ingin kita ambil
export const GetVillageConfigQuery =
  Prisma.validator<Prisma.VillageConfigFindFirstArgs>()({
    select: {
      id: true,
      villageCode: true,
      villageName: true,
      districtCode: true,
      districtName: true,
      regencyCode: true,
      regencyName: true,
      provinceCode: true,
      provinceName: true,
      officeAddress: true,
      postalCode: true,
      phone: true,
      email: true,
      website: true,
      establishedYear: true,
      description: true,
      areaSize: true,
      areaUnit: true,
      populationTotal: true,
      hamletCount: true,
      rwCount: true,
      rtCount: true,
      borderNorth: true,
      borderEast: true,
      borderSouth: true,
      borderWest: true,
      elevation: true,
      latitude: true,
      longitude: true,
      logoUrl: true,
      officePhotoUrl: true,
      vision: true,
      mission: true,
      slogan: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

// ✅ TypeScript inferred type
export type GetVillageConfigType = Prisma.VillageConfigGetPayload<
  typeof GetVillageConfigQuery
>;
