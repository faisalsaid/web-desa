'use client';

import { FinancingList } from '../../_lib/financing.type';
import { financingColumns } from './financing-columns';
import { FinancingDataTableComp } from './finaning-data-table';

interface Props {
  expanseDataTable: FinancingList;
  search?: string;
  totalPages: number;
  currentPage: number;
}

const FinancingTableComp = ({ expanseDataTable }: Props) => {
  return (
    <div>
      <FinancingDataTableComp
        columns={financingColumns}
        data={expanseDataTable}
      />
    </div>
  );
};

export default FinancingTableComp;
