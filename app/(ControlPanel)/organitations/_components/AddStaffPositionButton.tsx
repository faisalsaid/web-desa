'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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
        <Button size="icon" className="rounded-full bg-green-500">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Tambah Jabatan Baru</DialogTitle>
        </DialogHeader>

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
