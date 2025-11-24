'use client';

import { ColumnDef } from '@tanstack/react-table';
import { GetRevenueResult } from '../../_lib/revenue.type';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/helper';
import { RevenueFormDialog } from '../RevenueFormDialog';
import { RevenueCategoryOptions } from '@/lib/staticData';
import DeleteRevenueButton from './DeleteRevenueButton';

// // This type is used to define the shape of our data.
// // You can use a Zod schema here if you want.
// export type Payment = {
//   id: string;
//   amount: number;
//   status: 'pending' | 'processing' | 'success' | 'failed';
//   email: string;
// };

export const columns: ColumnDef<GetRevenueResult>[] = [
  {
    accessorKey: 'year',
    header: 'Tahun Anggaran',
    cell: ({ row }) => <p>{row.original.year.year}</p>,
  },
  {
    accessorKey: 'description',
    header: 'Deskripsi',
  },
  {
    accessorKey: 'category',
    header: 'Kategori',
    cell: ({ row }) => {
      const catgoryTranslate = RevenueCategoryOptions.find(
        (p) => p.value === row.original.category,
      );

      return <p>{catgoryTranslate?.label}</p>;
    },
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
        <RevenueFormDialog
          mode="update"
          initialData={row.original}
          buttonVariant={'outline'}
        />

        <DeleteRevenueButton id={row.original.id} />
        {/* <Button size={'icon'} className="rounded-full" variant={'outline'}>
          <Trash2 />
        </Button> */}
      </div>
    ),
  },
];
