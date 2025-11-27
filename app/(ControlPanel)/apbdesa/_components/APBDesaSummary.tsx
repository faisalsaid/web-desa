'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { BudgetYearSummary } from '../_lib/helper/budgetYearRefactorResume';

const APBDesaSummary = ({
  apbdesaSummary,
}: {
  apbdesaSummary: BudgetYearSummary[];
}) => {
  console.log(apbdesaSummary);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {apbdesaSummary.map((item) => (
        <Card key={item.year} className="rounded-2xl shadow-md p-4">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Tahun {item.year}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Revenue */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Pendapatan</h3>
              <p className="text-sm">
                Anggaran: Rp {item.totals.revenue.budget}
              </p>
              <p className="text-sm">
                Realisasi: Rp {item.totals.revenue.realized}
              </p>
              <Progress value={item.totals.revenue.percentage} />
              <p className="text-xs text-muted-foreground">
                {item.totals.revenue.percentage}% terealisasi
              </p>
            </div>

            {/* Expense */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Belanja</h3>
              <p className="text-sm">
                Anggaran: Rp {item.totals.expense.budget}
              </p>
              <p className="text-sm">
                Realisasi: Rp {item.totals.expense.realized}
              </p>
              <Progress value={item.totals.expense.percentage} />
              <p className="text-xs text-muted-foreground">
                {item.totals.expense.percentage}% terealisasi
              </p>
            </div>

            {/* Financing */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Pembiayaan</h3>
              <p className="text-sm">
                Penerimaan: Rp {item.totals.financing.receipt}
              </p>
              <p className="text-sm">
                Pengeluaran: Rp {item.totals.financing.expenditure}
              </p>

              <div className="space-y-1 mt-2">
                <p className="text-xs font-medium">
                  Penerimaan ({item.totals.financing.receiptPercentage}%)
                </p>
                <Progress value={item.totals.financing.receiptPercentage} />

                <p className="text-xs font-medium mt-2">
                  Pengeluaran ({item.totals.financing.expenditurePercentage}%)
                </p>
                <Progress value={item.totals.financing.expenditurePercentage} />
              </div>
            </div>

            {/* Surplus / Deficit */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Surplus / Defisit</h3>
              <p className="text-sm">
                Jumlah: Rp {item.summary.surplusDeficit}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.summary.surplusDeficitPercentage}% terhadap anggaran
                belanja
              </p>
            </div>

            {/* Ending Balance */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">SILPA / Saldo Akhir</h3>
              <p className="text-sm font-semibold">
                Rp {item.summary.endingBalance}
              </p>
              <p className="text-xs text-muted-foreground">
                Dampak pembiayaan: {item.summary.netFinancingImpactPercentage}%
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default APBDesaSummary;
