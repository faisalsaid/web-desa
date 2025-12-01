'use client';

import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { StaffForm, StaffFormUpdate } from './StaffForm';
import { toast } from 'sonner';
import { getStaffForEdit } from '../staff/_lib/staff.actions';
import { ScrollArea } from '@/components/ui/scroll-area';

const UpdatePerangkatButton = ({ staffId }: { staffId: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [staffData, setStaffData] = useState<StaffFormUpdate | null>(null);

  const handleEditClick = async () => {
    setLoading(true);
    setIsOpen(true); // Buka modal segera agar user tau ada respon

    // Fetch data fresh + Signed URL dari server
    const result = await getStaffForEdit(staffId);

    if (result.success && result.data) {
      setStaffData(result.data);
    } else {
      toast.error(result.message);
      setIsOpen(false); // Tutup jika gagal
    }

    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="rounded-full text-green-400"
          variant={'outline'}
          onClick={(e) => {
            // Prevent row selection if any
            e.stopPropagation();
            handleEditClick();
          }}
        >
          <Edit2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Staff</DialogTitle>
          <DialogDescription>
            <span className="text-xs"></span>
          </DialogDescription>
        </DialogHeader>
        <Separator />

        {loading ? (
          <div className="flex items-center justify-center h-40 space-y-4 flex-col">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            <p className="text-sm text-muted-foreground">
              Mengambil data & validasi gambar...
            </p>
          </div>
        ) : staffData ? (
          // RENDER FORM HANYA JIKA DATA SUDAH ADA
          <ScrollArea className="max-h-[calc(100vh-160px)] p-4">
            <StaffForm
              mode="update"
              defaultValues={staffData as StaffFormUpdate}
              closeModal={() => setIsOpen(false)}
            />
          </ScrollArea>
        ) : (
          <div className="text-center text-red-500 py-10">
            Gagal memuat data. Silakan coba lagi.
          </div>
        )}

        {/* <StaffPositionTypeForm closeModal={() => setIsOpen(false)} /> */}
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePerangkatButton;
