import { ColumnDef } from '@tanstack/react-table';
import { StaffType } from '../../../_lib/organitations.type';
import { Eye, UserLock, UserStar } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import DeleteStaffButton from '../../DeleteStaffButton';
import UpdatePerangkatButton from '../../UpdatePerangkatButton';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const staffColumns: ColumnDef<StaffType>[] = [
  {
    id: 'postion_type',
    header: 'Nama Jabatan',
    cell: ({ row }) => {
      return row.original.positionType.name;
    },
  },
  {
    accessorKey: 'name',
    header: 'Nama',
    cell: ({ row }) => {
      return row.original.name;
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div className="">
          {row.original.isActive ? (
            <Tooltip>
              <TooltipTrigger>
                <UserStar size={18} className="text-green-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Aktif</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger>
                <UserLock size={18} className="text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Tidak Aktif</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'startDate',
    header: 'Mulai',
    cell: ({ row }) => {
      return <div>{row.original.startDate.toLocaleDateString('id-ID')}</div>;
    },
  },
  {
    accessorKey: 'endDate',
    header: 'Berakhir',
    cell: ({ row }) => {
      return (
        <div>
          {row.original.endDate
            ? row.original.endDate.toLocaleDateString('id-ID')
            : '-'}
        </div>
      );
    },
  },
  {
    id: 'action',
    header: 'aksi',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <UpdatePerangkatButton staffId={row.original.id} />

        <Button variant="outline" size="icon" asChild className="rounded-full">
          <Link href={`/organitations/staff/${row.original.urlId}`}>
            <Eye className="text-sky-500" size={16} />
          </Link>
        </Button>

        <DeleteStaffButton id={row.original.id} />
      </div>
    ),
  },
];
