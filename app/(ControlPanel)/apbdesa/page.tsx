import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import AddBudgetYearComp from './_components/AddBudgetYearComp';
import {
  getBudgetYearsOptions,
  getBugetYearReport,
} from './_lib/apbdesa.action';

import { YearFilterSelector } from './_components/YearFilterSelector';
import APBDesaSummary from './_components/APBDesaSummary';
import { refactorToSummary } from './_lib/helper/budgetYearRefactorResume';

interface Props {
  yearId?: number;
}

export default async function ApbdesaPage({
  searchParams,
}: {
  searchParams: Promise<Props>;
}) {
  const params = await searchParams;
  const yearId = params.yearId ? Number(params.yearId) : undefined;

  const yearListOptions = await getBudgetYearsOptions();

  const recentYear = yearListOptions.sort((a, b) => b.year - a.year)[0];
  const data = await getBugetYearReport(yearId ? yearId : 0);
  // console.log(data);

  const resumeData = refactorToSummary(data);

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
              allTimeLabel="Semua"
            />
          )}
          <AddBudgetYearComp />
        </div>
      </ContentCard>

      <div className="grid gap-4">
        <ContentCard>
          <APBDesaSummary apbdesaSummary={resumeData} />
        </ContentCard>
        <div className="grid gap-4">
          <ContentCard>Grafik 1</ContentCard>
          <ContentCard>Grafik 2</ContentCard>
        </div>
        <ContentCard>Quick Navigation</ContentCard>
        <ContentCard>5 Last transactions</ContentCard>
      </div>
    </div>
  );
}
