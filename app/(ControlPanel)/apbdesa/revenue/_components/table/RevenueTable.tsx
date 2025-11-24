'use client';

import { GetRevenueResult } from '../../_lib/revenue.type';
import { columns } from './revenue-column';
import { RevenueDataTable } from './revenue-data-table';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { LimitSelector } from './LimitSelector';
import { RevenueTableSearchForm } from './RevenueTableSearchForm';
import { TablePagination } from './TablePagination';

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
  const searchParams = useSearchParams();

  const handleSearch = (value: string) => {
    router.push(`revenue?q=${encodeURIComponent(value)}&page=1`);
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`revenue?${params.toString()}`);
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
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => goToPage(page)}
        />
      </div>
    </div>
  );
};

export default RevenueTable;
