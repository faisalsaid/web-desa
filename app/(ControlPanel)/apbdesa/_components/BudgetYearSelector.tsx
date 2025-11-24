'use client';

import { FC } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export interface BudgetYear {
  id: number;
  year: number;
}

interface BudgetYearSelectorProps {
  value?: number;
  onChange: (value: number) => void;
  yearListOptions: BudgetYear[];
  placeholder?: string;
  className?: string;
}

export const BudgetYearSelector: FC<BudgetYearSelectorProps> = ({
  value,
  onChange,
  yearListOptions,
  placeholder = 'Tahun',
  className,
}) => {
  return (
    <Select
      value={value?.toString() || ''}
      onValueChange={(val) => onChange(Number(val))}
    >
      <SelectTrigger className={className || 'w-32'}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {yearListOptions.map((budget) => (
          <SelectItem key={budget.id} value={budget.id.toString()}>
            {budget.year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
