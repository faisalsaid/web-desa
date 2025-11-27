import { SanitizedBudgetYearReport } from './sanitizeBudgetYearReport';

export interface BudgetYearSummary {
  year: number;
  isActive: boolean;
  isLocked: boolean;
  isFinalized: boolean;

  totals: {
    revenue: {
      budget: string;
      realized: string;
      percentage: number;
    };
    expense: {
      budget: string;
      realized: string;
      percentage: number;
    };
    financing: {
      receipt: string;
      expenditure: string;
      netFinancing: string;
      receiptPercentage: number;
      expenditurePercentage: number;
    };
  };

  summary: {
    surplusDeficit: string;
    endingBalance: string;
    surplusDeficitPercentage: number;
    netFinancingImpactPercentage: number;
  };
}

export function refactorToSummary(
  data: SanitizedBudgetYearReport[],
): BudgetYearSummary[] {
  return data.map((item) => {
    // --- Convert string decimals to number ---
    const revenueBudget = Number(
      item.revenues.reduce((a, b) => a + Number(b.budget), 0),
    );
    const revenueRealized = Number(
      item.revenues.reduce((a, b) => a + Number(b.realized), 0),
    );

    const expenseBudget = Number(
      item.expenses.reduce((a, b) => a + Number(b.budget), 0),
    );
    const expenseRealized = Number(
      item.expenses.reduce((a, b) => a + Number(b.realized), 0),
    );

    const financingReceipt = Number(
      item.financing
        .filter((f) => f.type === 'RECEIPT')
        .reduce((a, b) => a + Number(b.amount), 0),
    );

    const financingExpenditure = Number(
      item.financing
        .filter((f) => f.type === 'EXPENDITURE')
        .reduce((a, b) => a + Number(b.amount), 0),
    );

    const netFinancing = financingReceipt - financingExpenditure;

    // --- Summary calculations ---
    const surplusDeficit = revenueRealized - expenseRealized;
    const endingBalance = surplusDeficit + netFinancing;

    const totalFinancing = financingReceipt + financingExpenditure || 1; // avoid divide by 0

    const revenuePercentage =
      revenueBudget > 0 ? (revenueRealized / revenueBudget) * 100 : 0;

    const expensePercentage =
      expenseBudget > 0 ? (expenseRealized / expenseBudget) * 100 : 0;

    const receiptPercentage = (financingReceipt / totalFinancing) * 100;
    const expenditurePercentage = (financingExpenditure / totalFinancing) * 100;

    const surplusDeficitPercentage =
      expenseBudget > 0 ? (surplusDeficit / expenseBudget) * 100 : 0;

    const netFinancingImpactPercentage =
      surplusDeficit !== 0
        ? (netFinancing / Math.abs(surplusDeficit)) * 100
        : 0;

    return {
      year: item.year,
      isActive: item.isActive,
      isLocked: item.isLocked,
      isFinalized: item.isFinalized,

      totals: {
        revenue: {
          budget: revenueBudget.toString(),
          realized: revenueRealized.toString(),
          percentage: Number(revenuePercentage.toFixed(2)),
        },
        expense: {
          budget: expenseBudget.toString(),
          realized: expenseRealized.toString(),
          percentage: Number(expensePercentage.toFixed(2)),
        },
        financing: {
          receipt: financingReceipt.toString(),
          expenditure: financingExpenditure.toString(),
          netFinancing: netFinancing.toString(),
          receiptPercentage: Number(receiptPercentage.toFixed(2)),
          expenditurePercentage: Number(expenditurePercentage.toFixed(2)),
        },
      },

      summary: {
        surplusDeficit: surplusDeficit.toString(),
        endingBalance: endingBalance.toString(),
        surplusDeficitPercentage: Number(surplusDeficitPercentage.toFixed(2)),
        netFinancingImpactPercentage: Number(
          netFinancingImpactPercentage.toFixed(2),
        ),
      },
    };
  });
}
