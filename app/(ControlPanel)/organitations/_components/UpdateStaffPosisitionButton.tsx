'use client';

import { useState } from 'react';
import { Edit } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  //   DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import StaffPositionTypeForm from './StaffPositionForm';
import { StaffPositionTypeUpdateInput } from '../_lib/organitaions.zod';
import { Separator } from '@/components/ui/separator';

interface UpdateStaffPosisitionButtonProps {
  staffPossition: StaffPositionTypeUpdateInput;
}

const UpdateStaffPosisitionButton = ({
  staffPossition,
}: UpdateStaffPosisitionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="rounded-full text-green-500"
          variant={'secondary'}
        >
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Ubah Jabatan</DialogTitle>
          <DialogDescription>
            Form ini digunakan untuk mengubah jabatan staff.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <StaffPositionTypeForm
          initialData={staffPossition}
          closeModal={() => setIsOpen(false)}
        />

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

export default UpdateStaffPosisitionButton;
