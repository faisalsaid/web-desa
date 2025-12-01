import { ColumnDef } from '@tanstack/react-table';
import { StaffType } from '../../../_lib/organitations.type';
import { UserLock, UserStar } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import DeleteStaffButton from '../../DeleteStaffButton';
import UpdatePerangkatButton from '../../UpdatePerangkatButton';
import { url } from 'inspector';

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
        <DeleteStaffButton id={row.original.id} />
      </div>
    ),
  },
];
