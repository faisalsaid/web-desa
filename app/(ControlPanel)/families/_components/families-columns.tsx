'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { familyRelationshipLabels } from '@/lib/enum';
import { FamiliesDataTableType } from '../_lib/families.type';

export const familyColumns: ColumnDef<FamiliesDataTableType>[] = [
  {
    accessorKey: 'familyCardNumber',
    header: 'Nomor KK',
  },
  {
    accessorKey: 'address',
    header: 'Alamat',
  },
  {
    accessorKey: 'dusun',
    header: 'Dusun',
  },
  {
    accessorKey: 'rw',
    header: 'RW',
  },
  {
    accessorKey: 'rt',
    header: 'RT',
  },
  {
    accessorKey: 'members',
    header: 'Anggota',
    cell: ({ row }) => {
      const members = row.getValue<FamiliesDataTableType['members']>('members');
      return (
        <div className="flex flex-wrap gap-1">
          {members.map((m) => (
            <Badge
              key={m.id}
              variant={
                m.familyRelationship === 'HEAD' ? 'destructive' : 'secondary'
              }
            >
              {m.fullName} (
              {familyRelationshipLabels[m.familyRelationship ?? 'OTHER']})
            </Badge>
          ))}
        </div>
      );
    },
  },
];
