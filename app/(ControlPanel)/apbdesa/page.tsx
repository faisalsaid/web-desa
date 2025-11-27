import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import AddBudgetYearComp from './_components/AddBudgetYearComp';
import { getBudgetYearsOptions } from './_lib/apbdesa.action';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { YearFilterSelector } from './_components/YearFilterSelector';

export default async function ApbdesaPage() {
  const yearListOptions = await getBudgetYearsOptions();

  const recentYear = yearListOptions.sort((a, b) => b.year - a.year)[0];
  console.log(recentYear);

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
            />
          )}
          <AddBudgetYearComp />
        </div>
      </ContentCard>

      <div className="grid gap-4">
        <ContentCard>Summary Card</ContentCard>
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
