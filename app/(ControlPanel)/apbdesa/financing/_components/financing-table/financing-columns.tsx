'use client';

import { formatCurrency } from '@/lib/utils/helper';
import { ColumnDef } from '@tanstack/react-table';
import { FinancingResult } from '../../_lib/financing.type';

export const financingColumns: ColumnDef<FinancingResult>[] = [
  {
    accessorKey: 'year',
    header: 'Tahun',
    cell: ({ row }) => <p>{row.original.year.year}</p>,
  },
  { accessorKey: 'description', header: 'Deskripsi' },

  {
    accessorKey: 'amount',
    header: 'Biaya',
    cell: ({ row }) => (
      <p className="text-right flex items-center justify-between gap-2">
        <span>Rp.</span> <span>{formatCurrency(row.original.amount)}</span>
      </p>
    ),
  },

  {
    id: 'action',
    header: 'Aksi',
    cell: ({ row }) => <div className="flex gap-1 items-center">ACtion</div>,
  },
];
