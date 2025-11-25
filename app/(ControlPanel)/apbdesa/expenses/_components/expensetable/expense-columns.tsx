'use client';

import { ColumnDef } from '@tanstack/react-table';
import { GetExpenseResult } from '../../_lib/expense.type';
import { formatCurrency } from '@/lib/utils/helper';
import { ExpemseSectorOptions } from '@/lib/enum';
import ExpenseFormDialog from '../ExpenseFormDialog';
import ExpenseDeleteButton from './ExpenseDeleteButton';

export const expenseColumns: ColumnDef<GetExpenseResult>[] = [
  {
    accessorKey: 'year',
    header: 'Tahun',
    cell: ({ row }) => <p>{row.original.year.year}</p>,
  },
  { accessorKey: 'description', header: 'Deskripsi' },
  {
    accessorKey: 'sector',
    header: 'Sektor',
    cell: ({ row }) => <p>{ExpemseSectorOptions[row.original.sector]}</p>,
  },
  {
    accessorKey: 'budget',
    header: 'Anggaran',
    cell: ({ row }) => (
      <p className="text-right flex items-center justify-between gap-2">
        <span>Rp.</span> <span>{formatCurrency(row.original.budget)}</span>
      </p>
    ),
  },
  {
    accessorKey: 'realized',
    header: 'Realisasi',
    cell: ({ row }) => (
      <p className="text-right flex items-center justify-between gap-2">
        <span>Rp.</span> <span>{formatCurrency(row.original.realized)}</span>
      </p>
    ),
  },
  {
    id: 'charge',
    header: 'Selisih',
    cell: ({ row }) => {
      const budget = Number(row.original.budget); // string → number
      const realized = Number(row.original.realized);

      const result = budget - realized;
      return (
        <p className="text-right flex items-center justify-between gap-2 ">
          <span>Rp.</span> <span>{formatCurrency(result)}</span>
        </p>
      );
    },
  },
  {
    id: 'action',
    header: 'Aksi',
    cell: ({ row }) => (
      <div className="flex gap-1 items-center">
        <ExpenseFormDialog
          triggerLabel="Update"
          expenseId={row.original.id}
          defaultValues={row.original}
          buttonVariant={'outline'}
        />
        <ExpenseDeleteButton id={row.original.id} />
        {/* <RevenueFormDialog
            mode="update"
            initialData={row.original}
            buttonVariant={'outline'}
          />
          <DeleteRevenueButton id={row.original.id} /> */}
      </div>
    ),
  },
];
