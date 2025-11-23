import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import {
  getStaffPositionToStaffFormOptions,
  getStaffs,
} from '../_lib/organitatons.action';
import StaffTableComp from '../_components/tables/staff/StaffTableComp';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import UpdatePerangkatButton from '../_components/UpdatePerangkatButton';

export default async function StaffPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; pageSize: number }>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const search = params.search ?? '';
  const pageSize = Number(params.pageSize ?? 10);

  const stafDataTable = await getStaffs({
    page,
    pageSize,
    search,
  });

  return (
    <div className="space-y-4">
      <ContentCard className="flex gap-4 items-center justify-between">
        <h1 className="text-xl font-semibold">Daftar Perangkat Desa</h1>
        <div className="flex gap-2">
          <Button
            size={'icon'}
            className="rounded-full bg-sky-400 hover:bg-sky-500 active:bg-sky-300"
          >
            <Link href={'settings'}>
              <Plus />
            </Link>
          </Button>
        </div>
      </ContentCard>
      <ContentCard>
        <StaffTableComp data={stafDataTable} />
      </ContentCard>
    </div>
  );
}
