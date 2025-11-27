'use client';

import { GetBugetYearReport } from '../_lib/apbdesa.type';
import { SanitizedBudgetYearReport } from '../_lib/helper/sanitizeBudgetYearReport';

const APBDesaSummary = ({
  apbdesaSummary,
}: {
  apbdesaSummary: SanitizedBudgetYearReport[];
}) => {
  console.log(apbdesaSummary);

  return <div>APBDesaSummary</div>;
};

export default APBDesaSummary;
