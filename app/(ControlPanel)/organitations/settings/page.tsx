import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import {
  getAllStaffPositionsTypes,
  getStaffPositionToStaffFormOptions,
} from '../_lib/organitatons.action';
import StaffPositionsList from '../_components/StaffPositionsList';
// import { getCurrentUser } from '@/app/_lib/root.action';
import { StaffForm } from '../_components/StaffForm';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Eye } from 'lucide-react';

export default async function SettingsOrganitationsPage() {
  const staffPossitons = await getAllStaffPositionsTypes();

  // const curentUser = await getCurrentUser();

  // const residnetList = await getResidentsToStaffFormOptions();
  const stafPositionsList = await getStaffPositionToStaffFormOptions();
  // console.log('stafPositionsList =>', stafPositionsList);

  return (
    <div className="space-y-4">
      <ContentCard>
        <div className="flex gap-4 items-center justify-between">
          <h1 className="text-xl font-semibold">Penetapan Perangkat Desa</h1>
          <div>
            <Button
              size={'icon'}
              className="rounded-full bg-sky-400 hover:bg-sky-500 active:bg-sky-300"
            >
              <Link href={'staff'}>
                <Eye />
              </Link>
            </Button>
          </div>
        </div>
      </ContentCard>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <ContentCard className="lg:col-span-3">
          <div className="space-y-4 ">
            <div className="font-medium">Atur Perkangkat Desa</div>
            <Separator />
            <StaffForm
              mode="create"
              // residents={residnetList}
              positions={stafPositionsList}
              // units={units}
            />
          </div>
        </ContentCard>

        <ContentCard className="lg:col-span-2">
          <StaffPositionsList staffPositions={staffPossitons} />
        </ContentCard>
      </div>
    </div>
  );
}
