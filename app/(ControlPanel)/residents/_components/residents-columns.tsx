'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SquarePen, Eye } from 'lucide-react';
import DeleteResidentButton from './DeleteResidentButton';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { populationStatusLabels } from '@/lib/enum';
import { ResidentType } from '../_lib/residents.type';

export const residentsColumns: ColumnDef<ResidentType>[] = [
  {
    accessorKey: 'nik',
    header: 'NIK',
  },
  {
    accessorKey: 'fullName',
    header: 'Nama Lengkap',
  },
  {
    accessorKey: 'gender',
    header: 'JK',
    cell: ({ row }) => {
      const value = row.original.gender;

      return value === 'MALE' ? 'Laki-laki' : 'Perempuan';
    },
  },
  {
    accessorKey: 'birthDate',
    header: 'Tanggal Lahir',
    cell: ({ row }) => {
      const val = row.original.birthDate;
      if (!val) return '-';

      // ➤ Format yyyy-MM-dd agar stabil di SSR
      return format(val, 'dd MMM yyyy', { locale: id });
    },
  },
  {
    accessorKey: 'populationStatus',
    header: 'Status Kependudukan',
    cell: ({ row }) => {
      const value = row.original.populationStatus;

      return populationStatusLabels[value] ?? value;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Dibuat',
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    },
  },
  {
    id: 'actions',
    header: 'Aksi',
    cell: ({ row }) => {
      const resident = row.original;

      return (
        <div className="flex gap-2">
          <Link href={`/residents/${resident.urlId}/update`}>
            <Button size="icon" className="rounded-full bg-green-500">
              <SquarePen size={16} />
            </Button>
          </Link>

          <Link href={`/residents/${resident.urlId}`}>
            <Button size="icon" className="rounded-full bg-muted-foreground">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteResidentButton id={resident.id} />

          {/* <form action={`/residents/${resident.id}/delete`} method="post">
            <Button size="icon" variant="destructive">
              <Trash2 size={16} />
            </Button>
          </form> */}
        </div>
      );
    },
  },
];
