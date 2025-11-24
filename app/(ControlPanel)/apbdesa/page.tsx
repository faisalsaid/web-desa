import ContentCard from '@/app/(ControlPanel)/_component/ContentCard';
import AddBudgetYearComp from './_components/AddBudgetYearComp';

export default function ApbdesaPage() {
  return (
    <div className="space-y-4">
      <ContentCard className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">APBDesa Page</h1>
        <AddBudgetYearComp />
      </ContentCard>
    </div>
  );
}
