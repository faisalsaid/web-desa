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
    <Button
      type="button"
      className="bg-muted border-red-400/50 border text-red-400"
      size={size}
      onClick={onReset}
    >
      <RefreshCcw size={18} />
      <span className="hidden">{label}</span>
    </Button>
  );
};
