'use client';

import { StaffPositionType } from '../_lib/organitations.type';
import AddStaffPositionButton from './AddStaffPositionButton';
import { GripVertical, MoreHorizontalIcon, User, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DeleteStaffPositionButton from './DeleteStaffPositionButton';
import UpdateStaffPosisitionButton from './UpdateStaffPosisitionButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface StaffPositionsProps {
  staffPositions: StaffPositionType[];
}

const StaffPositionsList = ({ staffPositions }: StaffPositionsProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <p className="font-medium">Nama Jabatan Desa </p>
        <AddStaffPositionButton />
      </div>
      {/* <Separator /> */}

      {staffPositions.length === 0 ? (
        <div className="border  rounded-md h-28 bg-background flex items-center justify-center text-muted-foreground">
          Belum ada jenis jabatan
        </div>
      ) : (
        <div className="space-y-1">
          {staffPositions.map((p) => (
            <ListCard key={p.id} position={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffPositionsList;

const ListCard = ({ position }: { position: StaffPositionType }) => {
  return (
    <div className="flex items-center justify-between gap-2 p-2 border  bg-background rounded-md">
      <div className=" flex items-center gap-1 flex-1">
        <GripVertical size={18} />
        <div className="flex-1">
          <p className="line-clamp-1">{position.name}</p>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {position.description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {position.isUnique ? (
          <Tooltip>
            <TooltipTrigger>
              <User size={18} className="text-orange-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Jabatan Tunggal</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger>
              <Users size={18} className="text-sky-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Jabatan Ganda</p>
            </TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger>
            {position.staffAssignments.length === 0 ? (
              <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-slate-200 dark:bg-slate-700">
                0
              </Badge>
            ) : (
              <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-green-600">
                {position.staffAssignments.length}
              </Badge>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>Jumlah perangkat</p>
          </TooltipContent>
        </Tooltip>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="More Options">
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-24" align="center">
              <DropdownMenuItem asChild>
                <UpdateStaffPosisitionButton staffPossition={position} />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <DeleteStaffPositionButton id={position.id} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
