import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import { FinancingType } from '@prisma/client';
import { getBudgetYearsOptions } from '../_lib/apbdesa.action';
import {
  FinancingTableResult,
  getFinanceDataTable,
} from './_lib/financing.actions';
import { YearFilterSelector } from '../_components/YearFilterSelector';
import FinancingFormDialog from './_components/FinancingFormDialog';

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

  let bucket: FinancingTableResult;

  if (result.success) {
    bucket = result.data;
  }

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
    </div>
  );
}
