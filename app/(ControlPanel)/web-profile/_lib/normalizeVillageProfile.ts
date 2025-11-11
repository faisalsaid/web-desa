// import { VillageProfileType } from './vilageProvile.type';
// import { VillageProfileFormValues } from './villageProvile.zod';

// export function normalizeVillageProfile(data: {
//   [K in keyof VillageProfileFormValues]: any;
// }): VillageProfileFormValues {
//   const cleanString = (v: any) => (v === null || v === undefined ? '' : v);
//   const cleanNumber = (v: any) =>
//     v === null || v === undefined ? undefined : Number(v);

//   return {
//     name: cleanString(data.name),
//     logo: cleanString(data.logo),
//     description: cleanString(data.description),

//     country: cleanString(data.country),
//     province: cleanString(data.province),
//     regency: cleanString(data.regency),
//     district: cleanString(data.district),
//     village: cleanString(data.village),

//     latitude: cleanNumber(data.latitude),
//     longitude: cleanNumber(data.longitude),
//     areaKm2: cleanNumber(data.areaKm2),
//     elevation: cleanNumber(data.elevation),
//     population: cleanNumber(data.population),

//     vision: cleanString(data.vision),
//     mission: cleanString(data.mission),

//     northBorder: cleanString(data.northBorder),
//     eastBorder: cleanString(data.eastBorder),
//     southBorder: cleanString(data.southBorder),
//     westBorder: cleanString(data.westBorder),

//     mapUrl: cleanString(data.mapUrl),
//   };
// }
