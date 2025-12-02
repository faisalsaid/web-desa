'use server';

import prisma from '@/lib/prisma';
import { StaffFormUpdate } from '../../_components/StaffForm';
import { b2UploadImage, getImageUrl } from '@/lib/b2storage.action';
import { getStaffDetailsQuery } from '../../_lib/organitations.type';
import {
  UpdateStaffInput,
  updateStaffSchema,
} from '../../_lib/organitaions.zod';
import { GetStaffQuery, TStaff } from './staff.type';

export async function getStaffForEdit(
  id: number,
): Promise<{ success: boolean; data?: StaffFormUpdate; message?: string }> {
  try {
    const staff = await prisma.staff.findUnique({
      where: { id },
      ...getStaffDetailsQuery,
    });

    if (!staff) {
      return { success: false, message: 'Data staff tidak ditemukan' };
    }

    // GENERATE SIGNED URL DISINI
    const signedUrl = staff.imageKey ? await getImageUrl(staff.imageKey) : null;

    // Mapping ke format yang dibutuhkan Form
    const formData: StaffFormUpdate = {
      id: staff.id,
      urlId: String(staff.urlId), // atau staff.uuid jika ada
      name: staff.name,
      imageKey: staff.imageKey, // Key asli disimpan untuk referensi
      imageUrl: signedUrl, // URL sementara untuk preview
      residentId: staff.residentId,
      residentName: staff.resident?.fullName,
      positionTypeId: staff.positionTypeId,
      positionName: staff.positionType.name,
      startDate: staff.startDate,
      endDate: staff.endDate,
      isActive: staff.isActive,
    };

    return { success: true, data: formData };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Gagal memuat data staff' };
  }
}

// NANDLE UPDATE STAFF START =================================================================

export async function updateStaff(input: Partial<UpdateStaffInput>) {
  const formData = new FormData();
  const { image, ...rest } = input;

  if (image instanceof File) {
    formData.append('file', image);
  }
  const file = formData.get('file') as File | null;

  //   console.log(file);
  //   console.log(rest);

  try {
    const parsed = updateStaffSchema.safeParse(rest);
    if (file && file.size > 0) {
      await b2UploadImage({
        file: file,
        folder: `staff/${parsed?.data?.urlId}`,
        customFileName: 'profile.jpg',
      });
    }

    if (!parsed.success) {
      return {
        success: false,
        message: 'Validasi gagal',
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const data = parsed.data;

    const updated = await prisma.staff.update({
      where: { id: data.id },
      data: {
        residentId: data.residentId,
        positionTypeId: data.positionTypeId,
        name: data.name,
        startDate: new Date(data.startDate as Date),
        endDate: data.endDate ? new Date(data.endDate) : null,
        isActive: data.isActive ?? true,
      },
    });

    return { success: true, message: 'Berahasil update staf', data: updated };
    // eslint-disable-next-line
  } catch (error) {
    return { success: false, message: 'Gagal update staf' };
  }
}

// HANDLE UPDATE STAFF END =================================================================

// GET SINGLE STAFF DETAIL START ============================================================

interface StaffDetailResult {
  success: boolean;
  data?: TStaff;
  message?: string;
}

export async function getStaffDetails(
  urlId: string,
): Promise<StaffDetailResult> {
  const staff = await prisma.staff.findUnique({
    where: { urlId },
    ...GetStaffQuery,
  });

  if (staff) {
    const signedUrl = staff.imageKey ? await getImageUrl(staff.imageKey) : null;

    const data = { ...staff, imageUrl: signedUrl };
    return {
      success: true,
      data: data as TStaff,
    };
  } else {
    return {
      success: false,
      message: 'Data staff tidak ditemukan',
    };
  }
}

// GET SINGLE STAFF DETAIL END ==============================================================
