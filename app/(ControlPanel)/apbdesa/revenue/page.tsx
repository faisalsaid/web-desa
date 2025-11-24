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

export default async function RevenuePage() {
  const yearListOptions = await getBudgetYearsOptions();

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

          {yearListOptions ? (
            <RevenueFormDialog
              mode="create"
              yearListOptions={yearListOptions}
            />
          ) : null}
        </div>
      </ContentCard>
    </div>
  );
}
