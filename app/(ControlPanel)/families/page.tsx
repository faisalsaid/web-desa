import ContentCard from '../_component/ContentCard';
import { Button } from '@/components/ui/button';

import { HousePlus, Search } from 'lucide-react';
import Link from 'next/link';
import { fetchFamilies } from './_lib/families.actions';

import FamilyDataTable from './_components/families-data-table';
import { familyColumns } from './_components/families-columns';
import { Input } from '@/components/ui/input';

const FamiliesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) => {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const search = params.search ?? '';
  const limit = 10;

  const { data = [], totalPages } = await fetchFamilies({
    page,
    limit,
    search,
  });

  return (
    <div className="space-y-4">
      <ContentCard className=" ">
        <div className="flex gap-4 items-center justify-between">
          <h1 className="text-xl font-semibold">Daftar Keluarga</h1>
          <div>
            <Link href={'/families/create'}>
              <Button>
                <HousePlus /> <span>Keluarga Baru</span>
              </Button>
            </Link>
          </div>
        </div>
      </ContentCard>

      <ContentCard>
        {/* SEARCH BAR */}
        <form className="mb-4 ">
          <div className="flex items-center gap-2 max-w-96">
            <Input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Cari NIK, Nama Kepala Keluarga ..."
              // className="border px-3 py-2 rounded w-64"
            />
            <Button>
              <Search /> <span>Cari</span>
            </Button>
          </div>
        </form>
        <FamilyDataTable
          columns={familyColumns}
          data={data}
          page={page}
          totalPages={totalPages as number}
        />
      </ContentCard>
    </div>
  );
};

export default FamiliesPage;
