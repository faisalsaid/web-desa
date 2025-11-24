'use client';

import { Separator } from '@/components/ui/separator';
import { BudgetYearForm } from './BudgetYearForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const AddBudgetYearComp = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={'icon'} className="rounded-full">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Tahun Anggaran </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Separator />
        <div>
          <BudgetYearForm closeModal={() => setIsOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBudgetYearComp;
