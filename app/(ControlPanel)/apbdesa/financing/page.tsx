import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import { FinancingType } from '@prisma/client';
import { getBudgetYearsOptions } from '../_lib/apbdesa.action';
import {
  FinancingTableResult,
  getFinanceDataTable,
} from './_lib/financing.actions';
import { YearFilterSelector } from '../_components/YearFilterSelector';
import FinancingFormDialog from './_components/FinancingFormDialog';
import FinancingTableComp from './_components/financing-table/FinancingTableComp';
import { FinancingList } from './_lib/financing.type';
import FinancingSummaryCard from './_components/FinancingSummary';

interface Props {
  q?: string;
  yearId?: number;
  financeType?: FinancingType;
  page?: number;
  pageSize?: number;
}

export default async function FinancingPage({
  searchParams,
}: {
  searchParams: Promise<Props>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const search = params.q ?? '';
  const limit = params.pageSize ? Number(params.pageSize) : 10;
  const financeType = params.financeType;
  const yearId = params.yearId ? Number(params.yearId) : undefined;

  const yearListOptions = await getBudgetYearsOptions();

  const result = await getFinanceDataTable({
    page,
    search,
    limit,
    financeType,
    yearId,
  });

  // ---------------------------------------------
  // 🔒 SAFE FALLBACKS (Tidak pernah undefined)
  // ---------------------------------------------
  const rows: FinancingList =
    result.success && result.data ? result.data.rows : [];

  const currentPage = result.success && result.data ? result.data.meta.page : 1;

  const totalPages =
    result.success && result.data ? result.data.meta.totalPages : 0;
  // ---------------------------------------------

  // if (result.success) {
  //   const summary = summarizeFinancingWithPercent(result.data.rows);
  //   console.log(summary);
  // }

  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Financing</h1>
        <div className="flex items-center justify-center gap-2">
          {yearListOptions.length === 0 ? (
            <div className="text-xs border bg-muted p-2 rounded-md text-muted-foreground">
              Tahun Anggaran Kosong
            </div>
          ) : (
            <YearFilterSelector
              yearListOptions={yearListOptions}
              basePath="financing"
              allTimeLabel="Semua"
            />
          )}

          <FinancingFormDialog />
        </div>
      </ContentCard>

      <div className="grid gap-4 sm:grid-cols-2">
        {result.success && result.data && (
          <FinancingSummaryCard
            summary={summarizeFinancingWithPercent(result.data.rows)}
          />
        )}
      </div>
      <ContentCard>
        <FinancingTableComp
          financingDataTable={rows}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </ContentCard>
    </div>
  );
}

type FinancingSummaryWithPercent = {
  totalReceipt: number;
  totalExpenditure: number;
  transactionCount: number;
  percentReceiptAmount: number;
  percentExpenditureAmount: number;
  percentReceiptCount: number;
  percentExpenditureCount: number;
};

function summarizeFinancingWithPercent(
  rows: {
    amount: string;
    type: 'RECEIPT' | 'EXPENDITURE';
  }[],
): FinancingSummaryWithPercent {
  const totalReceipt = rows
    .filter((r) => r.type === 'RECEIPT')
    .reduce((acc, r) => acc + Number(r.amount), 0);

  const totalExpenditure = rows
    .filter((r) => r.type === 'EXPENDITURE')
    .reduce((acc, r) => acc + Number(r.amount), 0);

  const transactionCount = rows.length;

  const totalAmount = totalReceipt + totalExpenditure;

  const receiptCount = rows.filter((r) => r.type === 'RECEIPT').length;
  const expenditureCount = rows.filter((r) => r.type === 'EXPENDITURE').length;

  return {
    totalReceipt,
    totalExpenditure,
    transactionCount,
    percentReceiptAmount: totalAmount ? (totalReceipt / totalAmount) * 100 : 0,
    percentExpenditureAmount: totalAmount
      ? (totalExpenditure / totalAmount) * 100
      : 0,
    percentReceiptCount: transactionCount
      ? (receiptCount / transactionCount) * 100
      : 0,
    percentExpenditureCount: transactionCount
      ? (expenditureCount / transactionCount) * 100
      : 0,
  };
}
