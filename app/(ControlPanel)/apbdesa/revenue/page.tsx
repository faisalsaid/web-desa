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

interface RevenuePageProps {
  q?: string;
  yearId?: number;
  category?: RevenueCategory;
  page?: number;
  limit?: number;
}
export default async function RevenuePage({
  searchParams,
}: {
  searchParams: Promise<RevenuePageProps>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const search = params.q ?? '';
  const limit = 5;
  const category = params.category;
  const yearId = params.yearId;

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
            <Select defaultValue={defaultValue?.toString() || ''}>
              <SelectTrigger className="w-32 bg-background">
                <SelectValue placeholder="Tahun" />
              </SelectTrigger>
              <SelectContent>
                {yearListOptions.map((budget) => (
                  <SelectItem key={budget.id} value={budget.id.toString()}>
                    {budget.year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
