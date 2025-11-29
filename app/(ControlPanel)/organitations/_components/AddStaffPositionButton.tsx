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
import { StaffPositionType } from '../_lib/organitations.type';

interface Props {
  staffPositions: StaffPositionType[];
}

const AddStaffPositionButton = ({ staffPositions }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

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
        <StaffPositionTypeForm
          staffPositions={staffPositions}
          closeModal={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddStaffPositionButton;
