import { GetRevenueResult } from '../../_lib/revenue.type';
import { columns } from './revenue-column';
import { RevenueDataTable } from './revenue-data-table';

// type Payment = {
//   id: string;
//   amount: number;
//   status: 'pending' | 'processing' | 'success' | 'failed';
//   email: string;
// };

// export const payments: Payment[] = [
//   {
//     id: '728ed52f',
//     amount: 100,
//     status: 'pending',
//     email: 'm@example.com',
//   },
//   {
//     id: '489e1d42',
//     amount: 125,
//     status: 'processing',
//     email: 'example@gmail.com',
//   },
//   // ...
// ];

interface RevenueTableProps {
  allRevenues: GetRevenueResult[];
}

const RevenueTable = ({ allRevenues }: RevenueTableProps) => {
  return (
    <div>
      <RevenueDataTable columns={columns} data={allRevenues} />
    </div>
  );
};

export default RevenueTable;
