import { RevenueCategory, ExpenseSector, FinancingType } from '@prisma/client';

// 1. Base Type untuk pasangan Anggaran vs Realisasi (dipakai berulang)
export interface BudgetProgress {
  budget: number;
  realized: number;
  percentage: number;
}

// 2. Base Type untuk Pembiayaan (Receipt vs Expenditure)
export interface FinancingSummary {
  receipt: number;
  expenditure: number;
  net: number; // Penerimaan - Pengeluaran
}

// 3. Type untuk Analisis Keuangan (Surplus/Defisit & SILPA)
export interface BudgetAnalysis {
  surplusDeficitBudget: number; // Pendapatan - Belanja (Anggaran)
  surplusDeficitRealized: number; // Pendapatan - Belanja (Realisasi)
  silpa: number; // Surplus/Defisit Realisasi + Pembiayaan Netto
}

// 4. Detail Item untuk Array (Rincian)
export interface RevenueDetailItem extends BudgetProgress {
  category: RevenueCategory; // Enum: OWN_SOURCE, TRANSFER, OTHER
  label: string; // Label user-friendly
}

export interface ExpenseDetailItem extends BudgetProgress {
  sector: ExpenseSector; // Enum: GOVERNMENT_ADMIN, etc.
  label: string; // Label user-friendly
}

// 5. Struktur Summary (Rekapitulasi Atas)
export interface ReportSummary {
  revenue: {
    totalBudget: number;
    totalRealized: number;
    percentage: number;
  };
  expense: {
    totalBudget: number;
    totalRealized: number;
    percentage: number;
  };
  financing: FinancingSummary;
  analysis: BudgetAnalysis;
}

// 6. Struktur Details (Rincian Bawah)
export interface ReportDetails {
  revenue: RevenueDetailItem[];
  expense: ExpenseDetailItem[];
  financing: {
    receipt: number;
    expenditure: number;
  };
}

// 7. Info Tahun Anggaran
export interface YearInfo {
  year: number;
  isActive: boolean;
  isFinalized: boolean;
  lastUpdated?: Date; // Optional
}

// === MAIN INTERFACE (Return Type Utama) ===
export interface BudgetYearReportResponse {
  status: 'success' | 'error';
  message?: string;
  yearInfo?: YearInfo;
  summary?: ReportSummary;
  details?: ReportDetails;
}
