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

const AddBudgetYearComp = () => {
  return (
    <Dialog>
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
          <BudgetYearForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBudgetYearComp;
