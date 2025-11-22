'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
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
import StaffPositionTypeForm from './StaffPositionForm';

const AddStaffPositionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  //   const handleFormSubmit = async (data: any) => {
  //     // Panggil server action createStaffPositionType
  //     // Misal: await createStaffPositionType(data)
  //     console.log("Submitted:", data);

  //     // Tutup modal setelah submit
  //     setIsOpen(false);
  //   };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-sky-500 hover:bg-sky-600"
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Buat Jabatan Baru</DialogTitle>
          <DialogDescription>
            <span className="text-xs">
              Pastikan jabatan yang ingin dibuat belum tersedia
            </span>
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <StaffPositionTypeForm closeModal={() => setIsOpen(false)} />

        {/* <div className="mt-4 text-right">
          <DialogClose asChild>
            <Button variant="ghost" size="sm">
              Batal
            </Button>
          </DialogClose>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default AddStaffPositionButton;
