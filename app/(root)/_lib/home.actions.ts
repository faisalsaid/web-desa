import prisma from '@/lib/prisma'; // pastikan prisma client sudah di-setup
import {
  GetVillageConfigQuery,
  GetVillageConfigType,
  QGetAllStaff,
  TStaffForHome,
} from './home.type';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getImageUrl } from '@/lib/b2storage.action';

import { RevenueCategory, ExpenseSector, FinancingType } from '@prisma/client';
import { BudgetYearReportResponse } from './bugutYear.type';

// ✅ Server Action
export async function getVillageConfig(): Promise<GetVillageConfigType | null> {
  try {
    const village = await prisma.villageConfig.findFirst(GetVillageConfigQuery);
    return village;
  } catch (error) {
    console.error('Failed to fetch village config:', error);
    return null;
  }
}

export async function getHeadOfVillage() {
  const headOfVillage = await prisma.staff.findFirst({
    where: { isActive: true, positionType: { positionType: 'TOP' } },
  });

  let signedUlr: string | null = null;

  if (headOfVillage?.imageKey) {
    signedUlr = await getImageUrl(headOfVillage.imageKey);
  }

  return {
    ...headOfVillage,
    imageUrl: signedUlr ?? '',
  };
}

export async function getAllStaff(): Promise<TStaffForHome[]> {
  const staff = prisma.staff.findMany({
    ...QGetAllStaff,
  });

  const result = await Promise.all(
    (
      await staff
    ).map(async (s) => {
      const signedUlr = await getImageUrl(s.imageKey);
      return {
        ...s,
        imageUrl: signedUlr,
      };
    }),
  );

  return result;
}

// Perhatikan penambahan ": Promise<BudgetYearReportResponse>"
export async function getCurrentBudgetYearSummaryReport(): Promise<BudgetYearReportResponse> {
  try {
    const currentYear = await prisma.budgetYear.findFirst({
      where: { deletedAt: null },
      orderBy: { year: 'desc' },
    });

    if (!currentYear) {
      return {
        status: 'error',
        message: 'Belum ada data tahun anggaran.',
      };
    }

    const yearId = currentYear.id;

    // ... (Query Aggregate & GroupBy sama seperti sebelumnya) ...
    const [revenueGroups, expenseGroups, financingGroups] = await Promise.all([
      prisma.revenue.groupBy({
        by: ['category'],
        where: { yearId, deletedAt: null },
        _sum: { budget: true, realized: true },
      }),
      prisma.expense.groupBy({
        by: ['sector'],
        where: { yearId, deletedAt: null },
        _sum: { budget: true, realized: true },
      }),
      prisma.financing.groupBy({
        by: ['type'],
        where: { yearId, deletedAt: null },
        _sum: { amount: true },
      }),
    ]);

    const toNum = (val: unknown) => Number(val || 0);

    // --- LOGIKA MAPPING (Sama seperti sebelumnya) ---

    let totalRevBudget = 0;
    let totalRevRealized = 0;

    // Mapping Revenue dengan Type Safety
    const revenueDetails = Object.values(RevenueCategory).map((cat) => {
      const data = revenueGroups.find((g) => g.category === cat);
      const budget = toNum(data?._sum.budget);
      const realized = toNum(data?._sum.realized);

      totalRevBudget += budget;
      totalRevRealized += realized;

      return {
        category: cat,
        label: formatRevenueLabel(cat),
        budget,
        realized,
        percentage:
          budget > 0 ? parseFloat(((realized / budget) * 100).toFixed(2)) : 0,
      };
    });

    let totalExpBudget = 0;
    let totalExpRealized = 0;

    // Mapping Expense dengan Type Safety
    const expenseDetails = Object.values(ExpenseSector).map((sec) => {
      const data = expenseGroups.find((g) => g.sector === sec);
      const budget = toNum(data?._sum.budget);
      const realized = toNum(data?._sum.realized);

      totalExpBudget += budget;
      totalExpRealized += realized;

      return {
        sector: sec,
        label: formatExpenseLabel(sec),
        budget,
        realized,
        percentage:
          budget > 0 ? parseFloat(((realized / budget) * 100).toFixed(2)) : 0,
      };
    });

    const financingReceiptData = financingGroups.find(
      (g) => g.type === FinancingType.RECEIPT,
    );
    const financingExpenditureData = financingGroups.find(
      (g) => g.type === FinancingType.EXPENDITURE,
    );

    const totalFinancingReceipt = toNum(financingReceiptData?._sum.amount);
    const totalFinancingExpenditure = toNum(
      financingExpenditureData?._sum.amount,
    );

    const surplusDeficitBudget = totalRevBudget - totalExpBudget;
    const surplusDeficitRealized = totalRevRealized - totalExpRealized;
    const netFinancing = totalFinancingReceipt - totalFinancingExpenditure;
    const silpa = surplusDeficitRealized + netFinancing;

    // --- RETURN OBJECT (TypeScript akan validasi struktur ini) ---
    return {
      status: 'success',
      yearInfo: {
        year: currentYear.year,
        isActive: currentYear.isActive,
        isFinalized: currentYear.isFinalized,
        lastUpdated: currentYear.updatedAt,
      },
      summary: {
        revenue: {
          totalBudget: totalRevBudget,
          totalRealized: totalRevRealized,
          percentage:
            totalRevBudget > 0
              ? parseFloat(
                  ((totalRevRealized / totalRevBudget) * 100).toFixed(2),
                )
              : 0,
        },
        expense: {
          totalBudget: totalExpBudget,
          totalRealized: totalExpRealized,
          percentage:
            totalExpBudget > 0
              ? parseFloat(
                  ((totalExpRealized / totalExpBudget) * 100).toFixed(2),
                )
              : 0,
        },
        financing: {
          receipt: totalFinancingReceipt,
          expenditure: totalFinancingExpenditure,
          net: netFinancing,
        },
        analysis: {
          surplusDeficitBudget,
          surplusDeficitRealized,
          silpa,
        },
      },
      details: {
        revenue: revenueDetails,
        expense: expenseDetails,
        financing: {
          receipt: totalFinancingReceipt,
          expenditure: totalFinancingExpenditure,
        },
      },
    };
  } catch (error) {
    console.error('Error fetching budget report:', error);
    // Return error sesuai interface
    return {
      status: 'error',
      message: 'Gagal mengambil laporan keuangan.',
    };
  }
}

// --- Helper Functions untuk Label (Opsional) ---
function formatRevenueLabel(cat: RevenueCategory): string {
  switch (cat) {
    case 'OWN_SOURCE':
      return 'Pendapatan Asli Daerah (PAD)';
    case 'TRANSFER':
      return 'Pendapatan Transfer';
    case 'OTHER':
      return 'Lain-lain Pendapatan Sah';
    default:
      return cat;
  }
}

function formatExpenseLabel(sec: ExpenseSector): string {
  switch (sec) {
    case 'GOVERNMENT_ADMIN':
      return 'Bidang Penyelenggaraan Pemerintahan';
    case 'DEVELOPMENT':
      return 'Bidang Pelaksanaan Pembangunan';
    case 'COMMUNITY_GUIDANCE':
      return 'Bidang Pembinaan Kemasyarakatan';
    case 'EMPOWERMENT':
      return 'Bidang Pemberdayaan Masyarakat';
    case 'EMERGENCY':
      return 'Bidang Penanggulangan Bencana & Mendesak';
    default:
      return sec;
  }
}
