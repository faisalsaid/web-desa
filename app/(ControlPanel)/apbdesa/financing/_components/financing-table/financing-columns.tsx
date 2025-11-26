'use client';

import { formatCurrency } from '@/lib/utils/helper';
import { ColumnDef } from '@tanstack/react-table';
import { FinancingResult } from '../../_lib/financing.type';
import FinancingFormDialog from '../FinancingFormDialog';
import FinancingDeleteButton from '../FinancingDeleteButton';

export const financingColumns: ColumnDef<FinancingResult>[] = [
  {
    accessorKey: 'year',
    header: 'Tahun',
    cell: ({ row }) => <p>{row.original.year.year}</p>,
  },
  { accessorKey: 'description', header: 'Deskripsi' },
  {
    accessorKey: 'type',
    header: 'Tipe',
    cell: ({ row }) => (
      <p>{row.original.type === 'RECEIPT' ? 'Penerimaan' : 'Pengerluaran'}</p>
    ),
  },

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
    cell: ({ row }) => (
      <div className="flex gap-1 items-center">
        <FinancingFormDialog
          financingId={row.original.id}
          buttonVariant={'outline'}
          defaultValues={row.original}
        />
        <FinancingDeleteButton id={row.original.id} />
      </div>
    ),
  },
];
