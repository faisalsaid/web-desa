'use client';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Folder } from 'lucide-react';

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

interface Props {
  title?: string;
  descriptions?: string;
}
const EmptyBudgetYearComp = ({
  title = 'No data',
  descriptions = 'No data found',
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{descriptions}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus /> Buat Tahun Anggaran
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Buat Tahun Anggaran </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <Separator />
            <div>
              <BudgetYearForm closeModal={() => setIsOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyBudgetYearComp;
