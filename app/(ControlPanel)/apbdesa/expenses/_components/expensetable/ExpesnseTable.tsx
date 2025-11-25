'use client';

import { GetExpenseList } from '../../_lib/expense.type';
import { expenseColumns } from './expense-columns';
import { ExpenseDataTableComp } from './expense-data-table';

const ExpesnseTable = ({
  expanseDataTable,
}: {
  expanseDataTable: GetExpenseList;
}) => {
  return (
    <div>
      <ExpenseDataTableComp columns={expenseColumns} data={expanseDataTable} />
    </div>
  );
};

export default ExpesnseTable;
