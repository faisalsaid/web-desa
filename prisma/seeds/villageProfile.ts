// // prisma/seeds/villageProfile.ts

// import { PrismaClient } from "@prisma/client";

// export default async function seedVillageProfile(prisma: PrismaClient) {
//   console.log("🌱 Seeding Village Profile...");

//   // Cek apakah sudah ada data (agar tidak double)
//   const existing = await prisma.villageProfile.findFirst();
//   if (existing) {
//     console.log("⚠️ Village Profile already exists, skip seeding.");
//     return;
//   }

//   await prisma.villageProfile.create({
//     data: {
//       name: "Desa Contoh"  // Hanya name
//     },
//   });

//   console.log("✅ Village Profile Seeded");
// }
