'use server';

import prisma from '@/lib/prisma';
import { StaffFormUpdate } from '../../_components/StaffForm';
import { getImageUrl } from '@/lib/b2storage.action';
import { getStaffDetailsQuery } from '../../_lib/organitations.type';

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
