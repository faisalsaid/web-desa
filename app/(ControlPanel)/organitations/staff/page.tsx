import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import { getStaffs } from '../_lib/organitatons.action';
import StaffTableComp from '../_components/tables/staff/StaffTableComp';

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
      <ContentCard>
        <h1 className="text-xl font-semibold">Daftar Perangkat Desa</h1>
      </ContentCard>
      <ContentCard>
        <StaffTableComp data={stafDataTable} />
      </ContentCard>
    </div>
  );
}
