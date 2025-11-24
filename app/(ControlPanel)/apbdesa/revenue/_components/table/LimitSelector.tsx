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
  defaultLimit?: number;
}

export const LimitSelector: FC<LimitSelectorProps> = ({
  defaultLimit = 10,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLimit = Number(searchParams.get('limit') ?? defaultLimit);

  const handleChange = (val: string) => {
    const newLimit = Number(val);
    const params = new URLSearchParams(searchParams.toString());
    params.set('limit', newLimit.toString());
    params.set('page', '1'); // reset page ke 1 saat limit berubah
    router.push(`revenue?${params.toString()}`);
  };

  return (
    <Select value={currentLimit.toString()} onValueChange={handleChange}>
      <SelectTrigger className="w-20 bg-background">
        <SelectValue placeholder="Limit" />
      </SelectTrigger>
      <SelectContent>
        {[5, 10, 20].map((num) => (
          <SelectItem key={num} value={num.toString()}>
            {num}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
