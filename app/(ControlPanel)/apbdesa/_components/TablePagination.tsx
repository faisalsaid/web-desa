'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  prevLabel?: string;
  nextLabel?: string;
}

export const TablePagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  prevLabel = 'Prev',
  nextLabel = 'Next',
}) => {
  if (totalPages <= 1) return null; // tidak perlu tampil jika 1 halaman saja

  return (
    <div className="flex justify-center gap-2 mt-2 flex-wrap">
      <Button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {prevLabel}
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'default' : 'outline'}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {nextLabel}
      </Button>
    </div>
  );
};
