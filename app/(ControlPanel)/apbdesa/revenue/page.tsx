import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getBudgetYearsOptions } from '../_lib/apbdesa.action';
import { RevenueFormDialog } from './_components/RevenueFormDialog';
import { getRevenueDataTable } from './_lib/revenue.actions';
import RevenueTable from './_components/table/RevenueTable';
import { RevenueCategory } from '@prisma/client';
import { BudgetYearSelector } from '../_components/BudgetYearSelector';
import { YearFilterSelector } from '../_components/YearFilterSelector';

interface RevenuePageProps {
  q?: string;
  yearId?: number;
  category?: RevenueCategory;
  page?: number;
  pageSize?: number;
}
export default async function RevenuePage({
  searchParams,
}: {
  searchParams: Promise<RevenuePageProps>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const search = params.q ?? '';
  const limit = params.pageSize ? Number(params.pageSize) : undefined;
  const category = params.category;
  const yearId = params.yearId ? Number(params.yearId) : undefined;

  const yearListOptions = await getBudgetYearsOptions();

  const {
    data: allRevenue,
    total,
    totalPages,
    page: thePage,
  } = await getRevenueDataTable({ page, search, limit, category, yearId });

  const defaultValue =
    yearListOptions.length > 0 ? yearListOptions[0].id : undefined;

  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Pendapatan</h1>
        <div className="flex items-center justify-center gap-2">
          {yearListOptions.length === 0 ? (
            <div className="text-xs border bg-muted p-2 rounded-md text-muted-foreground">
              Tahun Anggaran Kosong{' '}
            </div>
          ) : (
            <YearFilterSelector
              yearListOptions={yearListOptions}
              basePath="revenue"
              allTimeLabel="Semua"
            />
          )}

          {yearListOptions ? <RevenueFormDialog mode="create" /> : null}
        </div>
      </ContentCard>

      <ContentCard>
        <RevenueTable
          allRevenues={allRevenue}
          totalPages={totalPages}
          currentPage={thePage}
        />
      </ContentCard>
    </div>
  );
}
