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

export default async function ApbdesaPage() {
  const yearListOptions = await getBudgetYearsOptions();

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
            <Select>
              <SelectTrigger className="w-32">
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
          <AddBudgetYearComp />
        </div>
      </ContentCard>
    </div>
  );
}
