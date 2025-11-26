'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FinancingList } from '../../_lib/financing.type';
import { financingColumns } from './financing-columns';
import { FinancingDataTableComp } from './finaning-data-table';
import { useState } from 'react';
import { TableSearchForm } from '../../../_components/TableSearchForm';
import { ResetButton } from '../../../_components/ResetButton';
import { LimitSelector } from '../../../_components/LimitSelector';
import { TablePagination } from '../../../_components/TablePagination';

interface Props {
  financingDataTable: FinancingList;
  search?: string;
  totalPages: number;
  currentPage: number;
}

const FinancingTableComp = ({
  financingDataTable,
  search: defaultSearch = '',
  totalPages,
  currentPage,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchResetKey, setSearchResetKey] = useState(0);

  const handleSearch = (value: string) => {
    router.push(`financing?q=${encodeURIComponent(value)}&page=1`);
  };

  const handlePagination = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`financing?${params.toString()}`);
  };

  const handleReset = () => {
    router.push('financing');
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
            placeholder="e.g : Tambah modal saham desa..."
          />
        </div>
        <ResetButton onReset={handleReset} />
      </div>
      <FinancingDataTableComp
        columns={financingColumns}
        data={financingDataTable}
      />

      <div className="sm:flex items-center gap-4">
        <div className="hidden sm:flex">
          <LimitSelector
            basePath="financing"
            defaultLimit={10}
            paramName="pageSize"
            options={[2, 10, 20, 50, 100]}
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

export default FinancingTableComp;
