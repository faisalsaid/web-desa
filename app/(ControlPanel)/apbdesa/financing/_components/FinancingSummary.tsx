'use client';

import { FC } from 'react';
import { PercentageDonut } from '../../revenue/_components/RevenueSummary';

export type FinancingSummaryWithPercent = {
  totalReceipt: number;
  totalExpenditure: number;
  transactionCount: number;
  percentReceiptAmount: number;
  percentExpenditureAmount: number;
  percentReceiptCount: number;
  percentExpenditureCount: number;
};

interface Props {
  summary: FinancingSummaryWithPercent;
}

const FinancingSummaryCard: FC<Props> = ({ summary }) => {
  return (
    <div className="grid  gap-4 p-4 border rounded-lg bg-background shadow-sm">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="text-center flex items-center gap-4 justify-between">
          <div className="text-left border-l-2 pl-4 sm:pl-2 border-lime-400">
            <p className="text-sm text-gray-500">Pendapatan</p>
            <p className="font-semibold text-xl sm:text-base ">
              Rp. {summary.totalReceipt.toLocaleString()}
            </p>
          </div>

          <PercentageDonut
            percentage={Math.floor(summary.percentReceiptAmount)}
            size={65}
            bgColor="text-muted"
          />
        </div>
        <div className="text-center">
          <div className="text-center flex items-center gap-4 justify-between">
            <div
              className="text-left border-l-2 pl-4 sm:pl-2
             border-pink-600"
            >
              <p className="text-sm text-gray-500">Pengeluaran</p>
              <p className="font-semibold  text-xl  sm:text-base">
                Rp. {summary.totalExpenditure.toLocaleString()}
              </p>
            </div>

            <PercentageDonut
              percentage={Math.floor(summary.percentExpenditureAmount)}
              size={65}
              bgColor="text-muted"
              color="text-pink-600"
            />
          </div>
        </div>
      </div>

      <div className="text-center sm:flex gap-2 items-center">
        <p className="text-sm text-gray-500">Transaksi</p>
        <p className="font-semibold text-lg sm:text-base">
          {summary.transactionCount}
        </p>
        <p className="text-xs text-gray-600">
          Penadapatan {summary.percentReceiptCount.toFixed(2)}% | Pengeluaran{' '}
          {summary.percentExpenditureCount.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default FinancingSummaryCard;
