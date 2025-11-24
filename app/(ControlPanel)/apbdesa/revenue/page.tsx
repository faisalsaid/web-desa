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
import RevenueSummary from './_components/RevenueSummary';
import RevenueCategoryCard from './_components/RevenueCategoryCard';

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
    // total,
    totalPages,
    page: thePage,
  } = await getRevenueDataTable({ page, search, limit, category, yearId });

  /* --- GLOBAL SUMMARY --- */
  const totalBudget = allRevenue.reduce(
    (sum, item) => sum + Number(item.budget),
    0,
  );
  const totalRealized = allRevenue.reduce(
    (sum, item) => sum + Number(item.realized),
    0,
  );

  const percentage =
    totalBudget > 0 ? Math.round((totalRealized / totalBudget) * 100) : 0;

  /* --- CATEGORY SUMMARY --- */

  const categoryMap: Record<
    string,
    {
      totalBudget: number;
      totalRealized: number;
      items: number;
    }
  > = {};

  for (const item of allRevenue) {
    const type = item.category;

    if (!categoryMap[type]) {
      categoryMap[type] = {
        totalBudget: 0,
        totalRealized: 0,
        items: 0,
      };
    }

    categoryMap[type].totalBudget += Number(item.budget);
    categoryMap[type].totalRealized += Number(item.realized);
    categoryMap[type].items += 1;
  }

  const categorySummary = Object.keys(categoryMap).map((key) => ({
    type: key,
    totalBudget: categoryMap[key].totalBudget,
    totalRealized: categoryMap[key].totalRealized,
    items: categoryMap[key].items,
  }));

  /* --- FINAL OBJECT --- */
  const summary = {
    totalBudget,
    totalRealized,
    percentage,
    category: categorySummary,
  };

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
      <div className="grid sm:grid-cols-2 gap-4">
        <RevenueSummary summary={summary} />
        <RevenueCategoryCard />
      </div>

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
