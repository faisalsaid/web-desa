import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import { YearFilterSelector } from '../_components/YearFilterSelector';
import { getBudgetYearsOptions } from '../_lib/apbdesa.action';

interface Props {
  q?: string;
  yearId?: number;
  // category?: RevenueCategory;
  page?: number;
  pageSize?: number;
}

export default async function ExpensesPage({
  searchParams,
}: {
  searchParams: Promise<Props>;
}) {
  console.log(searchParams);

  // const params = await searchParams;
  // const page = Number(params.page ?? 1);
  // const search = params.q ?? '';
  // const limit = params.pageSize ? Number(params.pageSize) : undefined;
  // // const category = params.category;
  // const yearId = params.yearId ? Number(params.yearId) : undefined;

  const yearListOptions = await getBudgetYearsOptions();

  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Belanja</h1>
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

          {/* {yearListOptions ? <RevenueFormDialog mode="create" /> : null} */}
        </div>
      </ContentCard>
    </div>
  );
}
