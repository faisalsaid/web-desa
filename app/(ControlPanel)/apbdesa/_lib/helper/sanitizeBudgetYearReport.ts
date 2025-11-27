import { Revenue, Expense, Financing } from '@prisma/client';
import { GetBugetYearReport } from '../apbdesa.type';

export type SanitizedDecimal = string;

export interface SanitizedRevenue {
  id: number;
  urlId: string;
  category: Revenue['category'];
  description: string;
  budget: SanitizedDecimal;
  realized: SanitizedDecimal;
  createdAt: Date;
  updatedAt: Date;
}

export interface SanitizedExpense {
  id: number;
  urlId: string;
  sector: Expense['sector'];
  description: string;
  budget: SanitizedDecimal;
  realized: SanitizedDecimal;
  createdAt: Date;
  updatedAt: Date;
}

export interface SanitizedFinancing {
  id: number;
  urlId: string;
  type: Financing['type'];
  description: string;
  amount: SanitizedDecimal;
  createdAt: Date;
  updatedAt: Date;
}

export interface SanitizedBudgetYearReport {
  id: number;
  year: number;
  isActive: boolean;
  isLocked: boolean;
  isFinalized: boolean;
  createdAt: Date;
  updatedAt: Date;

  revenues: SanitizedRevenue[];
  expenses: SanitizedExpense[];
  financing: SanitizedFinancing[];
}

export const sanitizeBudgetYearReport = (
  data: GetBugetYearReport,
): SanitizedBudgetYearReport => {
  return {
    id: data.id,
    year: data.year,
    isActive: data.isActive,
    isLocked: data.isLocked,
    isFinalized: data.isFinalized,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,

    revenues: data.revenues.map((r) => ({
      id: r.id,
      urlId: r.urlId,
      category: r.category,
      description: r.description,
      budget: r.budget.toString(),
      realized: r.realized.toString(),
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    })),

    expenses: data.expenses.map((e) => ({
      id: e.id,
      urlId: e.urlId,
      sector: e.sector,
      description: e.description,
      budget: e.budget.toString(),
      realized: e.realized.toString(),
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    })),

    financing: data.financing.map((f) => ({
      id: f.id,
      urlId: f.urlId,
      type: f.type,
      description: f.description,
      amount: f.amount.toString(),
      createdAt: f.createdAt,
      updatedAt: f.updatedAt,
    })),
  };
};
