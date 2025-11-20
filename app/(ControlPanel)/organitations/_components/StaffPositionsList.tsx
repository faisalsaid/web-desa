'use client';

import { StaffPositionType } from '../_lib/organitations.type';
import AddStaffPositionButton from './AddStaffPositionButton';
import { GripVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
      <div className="space-y-1">
        {staffPositions.map((p) => (
          <ListCard key={p.id} position={p} />
        ))}
      </div>
    </div>
  );
};

export default StaffPositionsList;

const ListCard = ({ position }: { position: StaffPositionType }) => {
  return (
    <div className="flex items-center justify-between p-2 border  bg-background rounded-md">
      <div className=" flex items-center gap-1">
        <GripVertical size={18} />
        <p>{position.name}</p>
      </div>
      <div>
        {position.staffAssignments.length === 0 ? (
          <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-slate-200 dark:bg-slate-700">
            0
          </Badge>
        ) : (
          <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-green-600">
            {position.staffAssignments.length}
          </Badge>
        )}
      </div>
    </div>
  );
};
