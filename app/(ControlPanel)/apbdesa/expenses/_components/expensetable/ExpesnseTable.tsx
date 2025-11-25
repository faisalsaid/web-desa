'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { TableSearchForm } from '../../../_components/TableSearchForm';
import { GetExpenseList } from '../../_lib/expense.type';
import { expenseColumns } from './expense-columns';
import { ExpenseDataTableComp } from './expense-data-table';
import { useState } from 'react';
import { ResetButton } from '../../../_components/ResetButton';

interface Props {
  expanseDataTable: GetExpenseList;
  search?: string;
}
const ExpesnseTable = ({
  expanseDataTable,
  search: defaultSearch = '',
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchResetKey, setSearchResetKey] = useState(0);

  const handleSearch = (value: string) => {
    router.push(`expenses?q=${encodeURIComponent(value)}&page=1`);
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
    </div>
  );
};

export default ExpesnseTable;
