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
        <Button className="w-full mb-1" variant={'outline'}>
          <Edit className="text-green-500" />
          <span className="text-green-500"> Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Ubah Jabatan</DialogTitle>
          <DialogDescription>
            <span className="text-xs">
              Pastikan jabatan yang ingin diubah benar
            </span>
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
