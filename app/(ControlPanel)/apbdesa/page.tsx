import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import AddBudgetYearComp from './_components/AddBudgetYearComp';
import {
  getBudgetYearsOptions,
  getBugetYearReport,
  getLastFiveTransactions,
} from './_lib/apbdesa.action';

import { YearFilterSelector } from './_components/YearFilterSelector';
import APBDesaSummary from './_components/APBDesaSummary';
import { refactorToSummary } from './_lib/helper/budgetYearRefactorResume';
import EmptyBudgetYearComp from './_components/EmptyBudgetYearCom';
import EmptyStateComp from '@/components/EmptyStateComp';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { APBDesaChartComp } from './_components/APBDesaChartComp';
import LastFiveTransactionComp from './_components/LastFiveTransactionComp';

interface Props {
  yearId?: number;
}

export default async function ApbdesaPage({
  searchParams,
}: {
  searchParams: Promise<Props>;
}) {
  const yearListOptions = await getBudgetYearsOptions();

  if (yearListOptions.length === 0) {
    return (
      <EmptyBudgetYearComp
        title="Tidak Ada APBDES"
        descriptions="Pastikan tahun aggaran sudah tersedia"
      />
    );
  }

  const params = await searchParams;
  const yearId = params.yearId ? Number(params.yearId) : undefined;

  const recentYear = yearListOptions.sort((a, b) => b.year - a.year)[0];
  const data = await getBugetYearReport(yearId ? yearId : 0);
  // console.log(data);

  const apbdesa = data[0];

  const revenueEmpty = apbdesa.revenues.length === 0;
  const expensesEmpty = apbdesa.expenses.length === 0;
  const financingEmpty = apbdesa.financing.length === 0;

  const apbdesaEmpty = revenueEmpty && expensesEmpty && financingEmpty;

  const resumeData = refactorToSummary(data);

  const lastFiveTransaction = await getLastFiveTransactions();

  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">APBDesa</h1>
        <div className="flex items-center justify-center gap-2">
          {yearListOptions.length === 0 ? (
            <div className="text-xs border bg-muted p-2 rounded-md text-muted-foreground">
              Tahun Anggaran Kosong{' '}
            </div>
          ) : (
            <YearFilterSelector
              yearListOptions={yearListOptions}
              defaultYearId={recentYear.id}
              basePath="apbdesa"
              allTimeLabel="Pilih Tahun"
            />
          )}
          <AddBudgetYearComp />
        </div>
      </ContentCard>

      {apbdesaEmpty ? (
        <EmptyStateComp
          title="Belum ada laporan APBDesa"
          description="Pastikan tahun anggaran yang dipilih sudah ada datanya atau silahkan masukan data penerimaan, belanja atau pendaanan"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button asChild>
              <Link href={'/apbdesa/revenue'}>
                <Plus />
                Pendapatan
              </Link>
            </Button>
            <Button asChild>
              <Link href={'/apbdesa/expenses'}>
                <Plus />
                Belanja
              </Link>
            </Button>
            <Button asChild>
              <Link href={'/apbdesa/financing'}>
                <Plus />
                Pembiayaan
              </Link>
            </Button>
          </div>
        </EmptyStateComp>
      ) : (
        <div className="grid gap-4">
          <APBDesaSummary apbdesa={resumeData[0]} />

          <div className="grid gap-4 sm:grid-cols-3">
            <ContentCard className="sm:col-span-2">
              <APBDesaChartComp data={resumeData} />
            </ContentCard>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <Button asChild>
                  <Link href={'/apbdesa/revenue'}>
                    <Plus />
                    Pendapatan
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={'/apbdesa/expenses'}>
                    <Plus />
                    Belanja
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={'/apbdesa/financing'}>
                    <Plus />
                    Pembiayaan
                  </Link>
                </Button>
              </div>

              <ContentCard>
                <LastFiveTransactionComp data={lastFiveTransaction} />
              </ContentCard>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
