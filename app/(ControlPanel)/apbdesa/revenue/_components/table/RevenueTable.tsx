'use client';

import { GetRevenueResult } from '../../_lib/revenue.type';
import { columns } from './revenue-column';
import { RevenueDataTable } from './revenue-data-table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LimitSelector } from './LimitSelector';
import { RevenueTableSearchForm } from './RevenueTableSearchForm';

interface RevenueTableProps {
  allRevenues: GetRevenueResult[];
  totalPages: number;
  currentPage: number;
  search?: string;
}
const RevenueTable = ({
  allRevenues,
  totalPages,
  currentPage,
  search: defaultSearch = '',
}: RevenueTableProps) => {
  const router = useRouter();

  const handleSearch = (value: string) => {
    router.push(`revenue?q=${encodeURIComponent(value)}&page=1`);
  };

  const goToPage = (page: number) => {
    router.push(`revenue?q=${encodeURIComponent(defaultSearch)}&page=${page}`);
  };

  return (
    <div className="space-y-4">
      <div>
        <RevenueTableSearchForm
          defaultSearch={defaultSearch}
          onSearch={handleSearch}
        />
      </div>
      <RevenueDataTable columns={columns} data={allRevenues} />
      <div className="flex items-center gap-4">
        <LimitSelector
          basePath="revenue"
          defaultLimit={10}
          paramName="pageSize"
          options={[5, 10, 20, 50, 100]}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-2 flex-1">
            <Button
              disabled={currentPage <= 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              Prev
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? 'default' : 'outline'}
                onClick={() => goToPage(page)}
              >
                {page}
              </Button>
            ))}

            <Button
              disabled={currentPage >= totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueTable;
