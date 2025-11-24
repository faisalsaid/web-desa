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

interface LimitSelectorProps {
  defaultLimit?: number; // default limit jika query tidak ada
  options?: number[]; // pilihan limit, default [5,10,20]
  basePath?: string; // base path untuk push URL, default "/revenue"
  paramName?: string; // nama query param, default "limit"
  onChange?: (newLimit: number) => void; // callback opsional
}

export const LimitSelector: FC<LimitSelectorProps> = ({
  defaultLimit = 10,
  options = [5, 10, 20],
  basePath = 'dashboard',
  paramName = 'limit',
  onChange,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentLimit = Number(searchParams.get(paramName) ?? defaultLimit);

  const handleChange = (val: string) => {
    const newLimit = Number(val);

    // update query string
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramName, newLimit.toString());
    params.set('page', '1'); // reset page ke 1

    router.push(`${basePath}?${params.toString()}`);

    // panggil callback opsional
    onChange?.(newLimit);
  };

  return (
    <Select value={currentLimit.toString()} onValueChange={handleChange}>
      <SelectTrigger className="w-18 bg-background">
        <SelectValue placeholder="Limit" />
      </SelectTrigger>
      <SelectContent>
        {options.map((num) => (
          <SelectItem key={num} value={num.toString()}>
            {num}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
