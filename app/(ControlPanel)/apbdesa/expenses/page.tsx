import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import { YearFilterSelector } from '../_components/YearFilterSelector';
import { getBudgetYearsOptions } from '../_lib/apbdesa.action';
import { getExpenseDataTable } from './_lib/expense.actions';
import { ExpenseSector } from '@prisma/client';
import ExpenseFormDialog from './_components/ExpenseFormDialog';
import ExpesnseTable from './_components/expensetable/ExpesnseTable';
import ExpenseSumaryComp from './_components/ExpenseSumary';
import { ExpemseSectorOptions } from '@/lib/enum';
import { ExpenseSectorChart } from './_components/ExpenseSectorChart';
import EmptyBudgetYearComp from '../_components/EmptyBudgetYearCom';

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

  const summary = generateExpenseSummaryArray(allExpense);

  if (yearListOptions.length === 0) {
    return (
      <EmptyBudgetYearComp
        title="Tidak Ada Belanja"
        descriptions="Pastikan tahun aggaran sudah tersedia"
      />
    );
  }

  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Belanja</h1>
        <div className="flex items-center justify-center gap-2">
          {yearListOptions.length === 0 ? (
            <div className="text-xs border bg-muted p-2 rounded-md text-muted-foreground">
              Tahun Anggaran Kosong
            </div>
          ) : (
            <YearFilterSelector
              yearListOptions={yearListOptions}
              basePath="expenses"
              allTimeLabel="Semua"
            />
          )}

          <ExpenseFormDialog triggerLabel="Rekam Belanja" />
        </div>
      </ContentCard>

      <div className="sm:grid sm:grid-cols-2 sm:gap-4">
        <ExpenseSumaryComp summary={summary} />
        <ExpenseSectorChart sector={summary.sectors} />
      </div>

      <ContentCard>
        <ExpesnseTable
          expanseDataTable={allExpense}
          currentPage={meta.page}
          totalPages={meta.totalPages}
        />
      </ContentCard>
    </div>
  );
}

// ===================================================

export interface ExpenseSummaryItem {
  sector: ExpenseSector;
  label: string;
  budget: string;
  realized: string;
  count: number;
  percent: number;
}

export interface ExpenseSummaryArray {
  totalBudget: string;
  totalRealized: string;
  percent: number;
  sectors: ExpenseSummaryItem[];
}

function generateExpenseSummaryArray(
  expenses: Array<{
    sector: ExpenseSector;
    budget: string;
    realized: string;
  }>,
): ExpenseSummaryArray {
  // inisialisasi map sementara untuk menghitung per sektor
  const sectorMap: Record<ExpenseSector, ExpenseSummaryItem> = {
    GOVERNMENT_ADMIN: {
      sector: 'GOVERNMENT_ADMIN',
      label: ExpemseSectorOptions.GOVERNMENT_ADMIN,
      budget: '0',
      realized: '0',
      count: 0,
      percent: 0,
    },
    DEVELOPMENT: {
      sector: 'DEVELOPMENT',
      label: ExpemseSectorOptions.DEVELOPMENT,
      budget: '0',
      realized: '0',
      count: 0,
      percent: 0,
    },
    COMMUNITY_GUIDANCE: {
      sector: 'COMMUNITY_GUIDANCE',
      label: ExpemseSectorOptions.COMMUNITY_GUIDANCE,
      budget: '0',
      realized: '0',
      count: 0,
      percent: 0,
    },
    EMPOWERMENT: {
      sector: 'EMPOWERMENT',
      label: ExpemseSectorOptions.EMPOWERMENT,
      budget: '0',
      realized: '0',
      count: 0,
      percent: 0,
    },
    EMERGENCY: {
      sector: 'EMERGENCY',
      label: ExpemseSectorOptions.EMERGENCY,
      budget: '0',
      realized: '0',
      count: 0,
      percent: 0,
    },
  };

  let totalBudget = BigInt(0);
  let totalRealized = BigInt(0);

  for (const exp of expenses) {
    const budget = BigInt(exp.budget);
    const realized = BigInt(exp.realized);

    totalBudget += budget;
    totalRealized += realized;

    const sectorItem = sectorMap[exp.sector];
    sectorItem.budget = (BigInt(sectorItem.budget) + budget).toString();
    sectorItem.realized = (BigInt(sectorItem.realized) + realized).toString();
    sectorItem.count += 1;
  }

  // hitung persentase per sektor
  for (const sector of Object.keys(sectorMap) as ExpenseSector[]) {
    const s = sectorMap[sector];
    s.percent =
      BigInt(s.budget) > 0
        ? parseFloat(
            (
              (Number(BigInt(s.realized)) / Number(BigInt(s.budget))) *
              100
            ).toFixed(2),
          )
        : 0;
  }

  // persentase total
  const totalPercent =
    totalBudget > BigInt(0)
      ? parseFloat(
          ((Number(totalRealized) / Number(totalBudget)) * 100).toFixed(2),
        )
      : 0;

  return {
    totalBudget: totalBudget.toString(),
    totalRealized: totalRealized.toString(),
    percent: totalPercent,
    sectors: Object.values(sectorMap),
  };
}
