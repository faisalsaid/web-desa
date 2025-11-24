'use client';

import { FC } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';

export interface BudgetYear {
  id: number; // gunakan id = 0 untuk All Time
  year: number; // tahun, atau bisa 0 untuk All Time
}

interface YearFilterSelectorProps {
  yearListOptions: BudgetYear[];
  defaultYearId?: number; // bisa undefined
  paramName?: string; // default 'yearId'
  basePath?: string; // default '/revenue'
  allTimeLabel?: string; // teks untuk opsi All Time
}

export const YearFilterSelector: FC<YearFilterSelectorProps> = ({
  yearListOptions,
  defaultYearId,
  paramName = 'yearId',
  basePath = '/revenue',
  allTimeLabel = 'All Time',
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentYearId = searchParams.get(paramName)
    ? Number(searchParams.get(paramName))
    : defaultYearId ?? 0; // default All Time

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === '0') {
      // All Time: hapus filter yearId
      params.delete(paramName);
    } else {
      params.set(paramName, value);
    }

    params.set('page', '1'); // reset page
    router.push(`${basePath}?${params.toString()}`);
  };

  return (
    <Select value={currentYearId.toString()} onValueChange={handleChange}>
      <SelectTrigger className="w-32 bg-background">
        <SelectValue placeholder="Tahun" />
      </SelectTrigger>
      <SelectContent>
        {/* All Time */}
        <SelectItem value="0">{allTimeLabel}</SelectItem>

        {yearListOptions.map((y) => (
          <SelectItem key={y.id} value={y.id.toString()}>
            {y.year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
