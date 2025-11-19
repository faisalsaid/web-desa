import ContentCard from '../_component/ContentCard';
import { Button } from '@/components/ui/button';

import { HousePlus, Search } from 'lucide-react';
import Link from 'next/link';
import { fetchFamilies } from './_lib/families.actions';
import { FamilyDataTable } from './_components/families-data-table';
import { familyColumns } from './_components/families-columns';
import { FamiliesSearch } from './_components/FamiliesSearch';

interface Params {
  page?: string;
  pageSize?: string;
  search?: string;
}

interface FamiliesPageProps {
  params: Promise<Params>;
}

const FamiliesPage = async ({ params }: FamiliesPageProps) => {
  const { page, pageSize, search } = await params;

  const pageNumber = parseInt(page ?? '1', 10);
  const size = parseInt(pageSize ?? '10', 10);
  const searchQuery = search ?? '';

  const res = await fetchFamilies({
    page: pageNumber,
    pageSize: size,
    search: searchQuery,
  });

  console.log('FAMILY DATA TABLE', res);

  const data = res.success && res.data ? res.data : [];
  const total = res.success && res.total ? res.total : 0;
  const totalPages = total ? Math.ceil(total / size) : 1;

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
        <FamiliesSearch
          initialData={data}
          initialPage={pageNumber}
          initialPageSize={size}
        />
      </ContentCard>
    </div>
  );
};

export default FamiliesPage;
