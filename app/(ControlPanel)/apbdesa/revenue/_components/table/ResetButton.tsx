'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

interface ResetButtonProps {
  onReset: () => void; // aksi yang dijalankan saat reset
  label?: string; // teks tombol, default "Reset"
  size?: 'sm' | 'lg' | 'default' | 'icon' | null | undefined;
}

export const ResetButton: FC<ResetButtonProps> = ({
  onReset,
  label = 'Reset',
  size = 'default',
}) => {
  return (
    <Button type="button" variant="outline" size={size} onClick={onReset}>
      <RefreshCcw size={18} />
      {label}
    </Button>
  );
};
