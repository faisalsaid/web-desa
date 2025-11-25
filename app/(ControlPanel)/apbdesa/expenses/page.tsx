import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import { YearFilterSelector } from '../_components/YearFilterSelector';
import { getBudgetYearsOptions } from '../_lib/apbdesa.action';
import { getExpenseDataTable } from './_lib/expense.actions';
import { ExpenseSector } from '@prisma/client';
import ExpenseFormDialog from './_components/ExpenseFormDialog';

interface Props {
  q?: string;
  yearId?: number;
  sector?: ExpenseSector;
  page?: number;
  pageSize?: number;
}

export default async function ExpensesPage({
  searchParams,
}: {
  searchParams: Promise<Props>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const search = params.q ?? '';
  const limit = params.pageSize ? Number(params.pageSize) : 10;
  const sector = params.sector;
  const yearId = params.yearId ? Number(params.yearId) : undefined;

  const yearListOptions = await getBudgetYearsOptions();

  const { data: allExpense, meta } = await getExpenseDataTable({
    page,
    search,
    limit,
    sector,
    yearId,
  });

  console.log(allExpense, meta);

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
              basePath="expenses"
              allTimeLabel="Semua"
            />
          )}

          <ExpenseFormDialog triggerLabel="Rekam Belanja" />
          {/* {yearListOptions ? <RevenueFormDialog mode="create" /> : null} */}
        </div>
      </ContentCard>
    </div>
  );
}
