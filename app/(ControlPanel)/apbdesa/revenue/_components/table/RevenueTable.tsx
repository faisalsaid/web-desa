'use client';

import { GetRevenueResult } from '../../_lib/revenue.type';
import { columns } from './revenue-column';
import { RevenueDataTable } from './revenue-data-table';
import { useRouter, useSearchParams } from 'next/navigation';
import { LimitSelector } from '../../../_components/LimitSelector';
import { TableSearchForm } from '../../../_components/TableSearchForm';
import { TablePagination } from '../../../_components/TablePagination';
import { ResetButton } from '../../../_components/ResetButton';
import { useState } from 'react';

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

  const [searchResetKey, setSearchResetKey] = useState(0);

  const handleSearch = (value: string) => {
    router.push(`revenue?q=${encodeURIComponent(value)}&page=1`);
  };

  const handlePagination = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`revenue?${params.toString()}`);
  };

  const handleReset = () => {
    router.push('revenue');
    setSearchResetKey((prev) => prev + 1); // paksa re-render input
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center w-full ">
        <div className="flex-1">
          <TableSearchForm
            key={searchResetKey}
            defaultSearch={defaultSearch}
            onSearch={handleSearch}
            placeholder="e.g : Retrubusi pasar..."
          />
        </div>
        <ResetButton onReset={handleReset} />
      </div>
      <RevenueDataTable columns={columns} data={allRevenues} />

      <div className="sm:flex items-center gap-4">
        <div className="hidden sm:flex">
          <LimitSelector
            basePath="revenue"
            defaultLimit={10}
            paramName="pageSize"
            options={[10, 20, 50, 100]}
          />
        </div>
        {/* Pagination */}
        <div className="sm:flex-1">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => handlePagination(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default RevenueTable;
