'use client';

import { Separator } from '@/components/ui/separator';
import { StaffPositionType } from '../_lib/organitations.type';
import AddStaffPositionButton from './AddStaffPositionButton';
import { GripHorizontal, GripVertical } from 'lucide-react';

interface StaffPositionsProps {
  staffPositions: StaffPositionType[];
}

const StaffPositionsList = ({ staffPositions }: StaffPositionsProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <p className="font-medium">Daftar Jabatan Pengurus Desa </p>
        <AddStaffPositionButton />
      </div>
      {/* <Separator /> */}
      <div className="space-y-2">
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
    <div className="p-2 border flex items-center gap-1 bg-background rounded-md">
      <GripVertical size={18} />
      <p>{position.name}</p>
    </div>
  );
};
