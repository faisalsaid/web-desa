'use server';

import prisma from '@/lib/prisma';
import {
  getVillageProfileQuery,
  VillageProfileType,
} from '../_lib/vilageProvile.type';
import { auth } from '@/auth';
import { VillageProfileFormValues } from './villageProvile.zod';
import { writeFile } from 'fs/promises';
import { revalidatePath } from 'next/cache';
import sharp from 'sharp';
import path from 'path';

export const hasLoggedin = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  return session; // ✅ return session agar bisa dipakai di action
};

export async function getVillageProfile(): Promise<VillageProfileType | null> {
  await hasLoggedin();
  try {
    const data = await prisma.villageProfile.findFirst(getVillageProfileQuery);
    return data;
  } catch (err) {
    throw new Error('Failed to fetch village profile');
  }
}

// UPDATE ONLY (NO CREATE)
export async function updateVillageProfile(payload: VillageProfileFormValues) {
  await hasLoggedin();

  try {
    // Ambil village profile tunggal
    const existing = await prisma.villageProfile.findFirst();

    if (!existing) {
      // Tidak boleh create, hanya update
      throw new Error(
        'Village profile not found. Please ensure the seed has been run.',
      );
    }

    // Update record
    const updated = await prisma.villageProfile.update({
      where: { id: existing.id },
      data: {
        ...payload,
      },
    });

    return { ok: true, data: updated };
  } catch (err) {
    console.error(err);
    throw new Error('Failed to update village profile');
  }
}

// export const uploadVillageLogo = async () => {
//   await hasLoggedin();
// };

export async function uploadVillageLogo(formData: FormData) {
  await hasLoggedin();

  const file = formData.get('file') as File | null;

  if (!file) {
    throw new Error('No file uploaded');
  }

  const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowed.includes(file.type)) {
    throw new Error('Only JPG, JPEG, PNG allowed');
  }

  // Convert ke Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Resize + set DPI + compress
  const processed = await sharp(buffer)
    .resize(700, 700, { fit: 'inside', withoutEnlargement: true })
    .withMetadata({ density: 72 })
    .toFormat('jpeg', { quality: 80 })
    .toBuffer();

  // 🔥 Nama file statis
  const fileName = 'logo-desa.jpg';
  const outputPath = path.join(process.cwd(), 'public/img', fileName);

  await writeFile(outputPath, processed);

  const imageUrl = `/img/${fileName}`;

  // ✅ Update field logo di database
  // Asumsikan hanya ada satu VillageProfile aktif (misal yang pertama)
  await prisma.villageProfile.updateMany({
    data: { logo: imageUrl },
  });

  // optional — untuk refresh data halaman
  revalidatePath('/web-profile');

  return `/img/${fileName}`;
}
