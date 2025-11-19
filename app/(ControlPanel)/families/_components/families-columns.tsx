'use client';

import { ColumnDef } from '@tanstack/react-table';
import { FamiliesDataTableType } from '../_lib/families.type';
import { DUSUN_LIST } from '@/lib/staticData';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Edit, Eye } from 'lucide-react';

export const familyColumns: ColumnDef<FamiliesDataTableType>[] = [
  {
    accessorKey: 'familyCardNumber',
    header: 'Nomor KK',
  },
  {
    accessorKey: 'headOfFamily',
    header: 'Kepala Keluarga',
    cell: ({ row }) => {
      return <div>{row.original.headOfFamily?.fullName}</div>;
    },
  },
  {
    accessorKey: 'address',
    header: 'Alamat',
    cell: ({ row }) => {
      const family = row.original;
      const dusunName =
        DUSUN_LIST.find((d) => d.key === family.dusun)?.value ?? family.dusun;
      return (
        <span>
          {family.address}, {dusunName}, RW: {family.rw}, RT: {family.rt}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: 'Aksi',
    cell: ({ row }) => {
      const family = row.original;
      return (
        <div className="flex items-center gap-2">
          <Link href={`/families/${family.urlId}`}>
            <Button className="rounded-full bg-sky-300" size={'icon'}>
              <Eye />
            </Button>
          </Link>
          <Link href={`/families/${family.urlId}/update`}>
            <Button className="rounded-full bg-green-300" size={'icon'}>
              <Edit />
            </Button>
          </Link>

          <Button
            className="rounded-full"
            size={'icon'}
            variant={'destructive'}
            onClick={() => console.log('Delete', family.id)}
          >
            <Edit />
          </Button>
        </div>
      );
    },
  },
];
