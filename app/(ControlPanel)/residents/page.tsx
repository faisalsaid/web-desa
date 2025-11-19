import { Button } from '@/components/ui/button';
import ContentCard from '../_component/ContentCard';
import { Search, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { ResidentDataTable } from './_components/resident-data-table';
import { getResidents } from './_lib/residents.actions';
import { residentsColumns } from './_components/residents-columns';
import { Input } from '@/components/ui/input';

const ResidentsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) => {
  // const residents = await prisma.resident.findMany({
  //   where: { deletedAt: null },
  //   orderBy: { createdAt: 'desc' },
  // });

  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const search = params.search ?? '';
  const limit = 10;

  const { items, totalPages } = await getResidents({ page, limit, search });
  return (
    <div className="space-y-4">
      <ContentCard className=" ">
        <div className="flex gap-4 items-center justify-between">
          <h1 className="text-xl font-semibold">Data Penduduk</h1>
          <div>
            <Link href={'/residents/add'}>
              <Button>
                <UserPlus /> <span>Tambah Warga</span>
              </Button>
            </Link>
          </div>
        </div>
      </ContentCard>
      <div className="space-y-6">
        {/* <h1 className="text-2xl font-semibold">Data Penduduk</h1> */}

        {/* SEARCH BAR */}
        <form className="mb-4 ">
          <div className="flex items-center gap-2 max-w-96">
            <Input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Cari NIK atau Nama..."
              // className="border px-3 py-2 rounded w-64"
            />
            <Button>
              <Search /> <span>Cari</span>
            </Button>
          </div>
        </form>

        <ResidentDataTable
          columns={residentsColumns}
          data={items}
          page={page}
          totalPages={totalPages}
        />
      </div>
      <ContentCard />
    </div>
  );
};

export default ResidentsPage;
