'use client';

import { Progress } from '@/components/ui/progress';

import { BudgetYearSummary } from '../_lib/helper/budgetYearRefactorResume';
import ContentCard from '../../_component/ContentCard';
import { formatCurrency } from '@/lib/utils/helper';
import { PercentageDonut } from '../revenue/_components/RevenueSummary';
import { ArrowBigDownDash, ArrowBigUpDash } from 'lucide-react';

const APBDesaSummary = ({ apbdesa }: { apbdesa: BudgetYearSummary }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      <ContentCard>
        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">
              SiLPA / Saldo Akhir
            </h3>
            <p className="text-xl font-bold">
              Rp.{formatCurrency(apbdesa.summary.endingBalance)}
            </p>
            <p className="text-xs text-muted-foreground">
              Dampak pembiayaan:{' '}
              <span className="text-green-500">
                {apbdesa.summary.netFinancingImpactPercentage}%
              </span>
            </p>
          </div>
          <div className="grid grid-cols-3 bg-muted rounded-xl p-4 gap-4">
            <div className="space-y-1">
              <p className="text-xs">Penerimaan </p>
              <PercentageDonut percentage={apbdesa.totals.revenue.percentage} />
            </div>
            <div className="space-y-1">
              <p className="text-xs">Belanja </p>
              <PercentageDonut percentage={apbdesa.totals.expense.percentage} />
            </div>
            <div className="space-y-1">
              <p className="text-xs">Pembiayaan </p>
              <div className="">
                <div className="flex items-center gap-1 text-lime-500">
                  <ArrowBigDownDash className="w-5 h-5" />
                  <p className="font-semibold">
                    {apbdesa.totals.financing.receiptPercentage}%
                  </p>
                </div>
                <div className="flex items-center gap-1 text-pink-600">
                  <ArrowBigUpDash className="w-5 h-5" />
                  <p className="font-semibold">
                    {apbdesa.totals.financing.expenditurePercentage}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentCard>
      <div className="space-y-4">
        <ContentCard className="space-y-2">
          <h3 className="font-semibold">Pendapatan</h3>
          <div>
            <div className="flex gap-2 items-center justify-between">
              <p className="text-xs">Anggaran </p>
              <p>Rp {formatCurrency(apbdesa.totals.revenue.budget)}</p>
            </div>
            <div className="flex gap-2 items-center justify-between">
              <p className="text-xs">Realisasi </p>
              <p>Rp {formatCurrency(apbdesa.totals.revenue.realized)}</p>
            </div>
          </div>
          <div className="space-y-1">
            <Progress value={apbdesa.totals.revenue.percentage} />
            <p className="text-xs text-muted-foreground">
              {apbdesa.totals.revenue.percentage}% terealisasi
            </p>
          </div>
        </ContentCard>
        <ContentCard className="space-y-2">
          <h3 className="font-semibold">Belanja</h3>
          <div>
            <div className="flex gap-2 items-center justify-between">
              <p className="text-xs">Anggaran </p>
              <p>Rp {formatCurrency(apbdesa.totals.expense.budget)}</p>
            </div>
            <div className="flex gap-2 items-center justify-between">
              <p className="text-xs">Realisasi </p>
              <p>Rp {formatCurrency(apbdesa.totals.expense.realized)}</p>
            </div>
          </div>
          <div className="space-y-1">
            <Progress value={apbdesa.totals.expense.percentage} />
            <p className="text-xs text-muted-foreground">
              {apbdesa.totals.expense.percentage}% terealisasi
            </p>
          </div>
        </ContentCard>
      </div>
      <div className="space-y-4">
        <ContentCard className="space-y-2">
          <h3 className="font-semibold">Pembiayaan</h3>
          <div className="space-y-3">
            <div>
              <div className="flex gap-2 items-center justify-between">
                <p className="text-xs">Penerimaan</p>
                <p>Rp. {formatCurrency(apbdesa.totals.financing.receipt)}</p>
              </div>
              <div className="flex gap-2 items-center">
                <Progress value={apbdesa.totals.financing.receiptPercentage} />
                <p className="text-sm">
                  {apbdesa.totals.financing.receiptPercentage}%
                </p>
              </div>
            </div>
            <div>
              <div className="flex gap-2 items-center justify-between">
                <p className="text-xs">Pengeluaran</p>
                <p>
                  Rp. {formatCurrency(apbdesa.totals.financing.expenditure)}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Progress
                  value={apbdesa.totals.financing.expenditurePercentage}
                />
                <p className="text-sm">
                  {apbdesa.totals.financing.expenditurePercentage}%
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-between">
              <p className="text-xs">Sisa pokok</p>
              <p>Rp. {formatCurrency(apbdesa.totals.financing.netFinancing)}</p>
            </div>
          </div>
        </ContentCard>
        <ContentCard className="">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Surplus / Deficit </h3>
            <p className="font-bold">
              Rp {formatCurrency(apbdesa.summary.surplusDeficit)}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {apbdesa.summary.surplusDeficitPercentage}% terhadap anggaran
            belanja
          </p>
        </ContentCard>
      </div>
    </div>
  );
};

export default APBDesaSummary;

// return (
//     <div className="">
//       {apbdesaSummary.map((item) => (
//         <Card key={item.year} className="rounded-2xl shadow-md p-4">
//           <CardHeader>
//             <CardTitle className="text-xl font-bold">
//               Tahun {item.year}
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             {/* Revenue */}
//             <div className="space-y-2">
//               <h3 className="font-semibold text-lg">Pendapatan</h3>
//               <p className="text-sm">
//                 Anggaran: Rp {item.totals.revenue.budget}
//               </p>
//               <p className="text-sm">
//                 Realisasi: Rp {item.totals.revenue.realized}
//               </p>
//               <Progress value={item.totals.revenue.percentage} />
//               <p className="text-xs text-muted-foreground">
//                 {item.totals.revenue.percentage}% terealisasi
//               </p>
//             </div>

//             {/* Expense */}
//             <div className="space-y-2">
//               <h3 className="font-semibold text-lg">Belanja</h3>
//               <p className="text-sm">
//                 Anggaran: Rp {item.totals.expense.budget}
//               </p>
//               <p className="text-sm">
//                 Realisasi: Rp {item.totals.expense.realized}
//               </p>
//               <Progress value={item.totals.expense.percentage} />
//               <p className="text-xs text-muted-foreground">
//                 {item.totals.expense.percentage}% terealisasi
//               </p>
//             </div>

//             {/* Financing */}
//             <div className="space-y-2">
//               <h3 className="font-semibold text-lg">Pembiayaan</h3>
//               <p className="text-sm">
//                 Penerimaan: Rp {item.totals.financing.receipt}
//               </p>
//               <p className="text-sm">
//                 Pengeluaran: Rp {item.totals.financing.expenditure}
//               </p>

//               <div className="space-y-1 mt-2">
//                 <p className="text-xs font-medium">
//                   Penerimaan ({item.totals.financing.receiptPercentage}%)
//                 </p>
//                 <Progress value={item.totals.financing.receiptPercentage} />

//                 <p className="text-xs font-medium mt-2">
//                   Pengeluaran ({item.totals.financing.expenditurePercentage}%)
//                 </p>
//                 <Progress value={item.totals.financing.expenditurePercentage} />
//               </div>
//             </div>

//             {/* Surplus / Deficit */}
//             <div className="space-y-2">
//               <h3 className="font-semibold text-lg">Surplus / Defisit</h3>
//               <p className="text-sm">
//                 Jumlah: Rp {item.summary.surplusDeficit}
//               </p>
//               <p className="text-xs text-muted-foreground">
//                 {item.summary.surplusDeficitPercentage}% terhadap anggaran
//                 belanja
//               </p>
//             </div>

//             {/* Ending Balance */}
//             <div className="space-y-2">
//               <h3 className="font-semibold text-lg">SILPA / Saldo Akhir</h3>
//               <p className="text-sm font-semibold">
//                 Rp {item.summary.endingBalance}
//               </p>
//               <p className="text-xs text-muted-foreground">
//                 Dampak pembiayaan: {item.summary.netFinancingImpactPercentage}%
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
