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
    cell: ({ row }) => {
      const data = row.original; // <--- ambil semua data row

      const formData = {
        id: data.id,
        urlId: data.urlId,
        imageUrl: data.imageUrl,
        imageKey: data.imageKey,
        residentId: data.residentId,
        name: data.name,
        residentName: data?.resident?.fullName,
        positionTypeId: data.positionTypeId,
        positionName: data.positionType.name,
        startDate: data.startDate,
        endDate: data.endDate,
        isActive: data.isActive,
      };
      return (
        <div className="flex gap-2">
          <UpdatePerangkatButton staffData={formData} />
          <DeleteStaffButton id={row.original.id} />
        </div>
      );
    },
  },
];
