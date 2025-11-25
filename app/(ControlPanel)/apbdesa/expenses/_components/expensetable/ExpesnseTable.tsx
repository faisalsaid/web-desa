'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { TableSearchForm } from '../../../_components/TableSearchForm';
import { GetExpenseList } from '../../_lib/expense.type';
import { expenseColumns } from './expense-columns';
import { ExpenseDataTableComp } from './expense-data-table';
import { useState } from 'react';
import { ResetButton } from '../../../_components/ResetButton';
import { TablePagination } from '../../../_components/TablePagination';
import { LimitSelector } from '../../../_components/LimitSelector';

interface Props {
  expanseDataTable: GetExpenseList;
  search?: string;
  totalPages: number;
  currentPage: number;
}
const ExpesnseTable = ({
  expanseDataTable,
  search: defaultSearch = '',
  totalPages,
  currentPage,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchResetKey, setSearchResetKey] = useState(0);

  const handleSearch = (value: string) => {
    router.push(`expenses?q=${encodeURIComponent(value)}&page=1`);
  };

  const handlePagination = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`expenses?${params.toString()}`);
  };

  const handleReset = () => {
    router.push('expenses');
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
            placeholder="e.g : Pembangunan jalan..."
          />
        </div>
        <ResetButton onReset={handleReset} />
      </div>
      <ExpenseDataTableComp columns={expenseColumns} data={expanseDataTable} />

      <div className="sm:flex items-center gap-4">
        <div className="hidden sm:flex">
          <LimitSelector
            basePath="expenses"
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

export default ExpesnseTable;
