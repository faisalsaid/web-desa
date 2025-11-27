// lib/prismaTypes.ts
import type { BudgetYear, Revenue, Expense, Financing } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

/** Serialisasi Decimal -> string */
function decToString(d: Decimal | null | undefined): string | null {
  if (d === null || d === undefined) return null;
  return d.toString();
}

/** Safe mapped types for JSON output (no any) */
export type RevenueDTO = Omit<Revenue, 'budget' | 'realized'> & {
  budget: string;
  realized: string;
};

export type ExpenseDTO = Omit<Expense, 'budget' | 'realized'> & {
  budget: string;
  realized: string;
};

export type FinancingDTO = Omit<Financing, 'amount'> & { amount: string };

export type BudgetYearDTO = Omit<BudgetYear, never> & {
  revenues: RevenueDTO[];
  expenses: ExpenseDTO[];
  financing: FinancingDTO[];
};

export function serializeRevenue(r: Revenue): RevenueDTO {
  return {
    ...r,
    budget: decToString(r.budget) ?? '0',
    realized: decToString(r.realized) ?? '0',
  };
}

export function serializeExpense(e: Expense): ExpenseDTO {
  return {
    ...e,
    budget: decToString(e.budget) ?? '0',
    realized: decToString(e.realized) ?? '0',
  };
}

export function serializeFinancing(f: Financing): FinancingDTO {
  return {
    ...f,
    amount: decToString(f.amount) ?? '0',
  };
}
