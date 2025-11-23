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

const UpdatePerangkatButton = ({
  staffData,
}: {
  staffData: StaffFormUpdate;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="rounded-full text-green-400"
          variant={'outline'}
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
        <StaffForm
          mode="update"
          defaultValues={staffData}
          closeModal={() => setIsOpen(false)}
        />
        {/* <StaffPositionTypeForm closeModal={() => setIsOpen(false)} /> */}
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePerangkatButton;
