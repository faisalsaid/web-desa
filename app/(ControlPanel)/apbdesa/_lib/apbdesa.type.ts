import {
  ExpenseSector,
  FinancingType,
  Prisma,
  RevenueCategory,
} from '@prisma/client';

export const getBudgetYearQuery =
  Prisma.validator<Prisma.BudgetYearDefaultArgs>()({
    select: {
      id: true,
      year: true,
      isActive: true,
      isLocked: true,
      isFinalized: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      revenues: true,
      expenses: true,
      financing: true,
    },
  });

// Auto-infer the return type (very useful for Server Actions!)
export type GetBudgetYearResult = Prisma.BudgetYearGetPayload<
  typeof getBudgetYearQuery
>;

// APBDESA SUMMARY

export const GetBugetYearReportQuery =
  Prisma.validator<Prisma.BudgetYearDefaultArgs>()({
    include: {
      expenses: {
        where: {
          deletedAt: null,
        },
      },
      revenues: {
        where: {
          deletedAt: null,
        },
      },
      financing: {
        where: {
          deletedAt: null,
        },
      },
    },
  });

// export const GetBugetYearReportQuery =
//   Prisma.validator<Prisma.BudgetYearDefaultArgs>()({
//     include: {
//       expenses: {
//         select: {
//           id: true,
//           urlId: true,
//           description: true,
//           sector: true,
//           budget: true,
//           realized: true,
//           yearId: true,
//         },
//       },
//       revenues: {
//         select: {
//           id: true,
//           urlId: true,
//           description: true,
//           budget: true,
//           realized: true,
//           category: true,
//           yearId: true,
//         },
//       },
//       financing: {
//         select: {
//           id: true,
//           urlId: true,
//           description: true,
//           type: true,
//           amount: true,
//           yearId: true,
//         },
//       },
//     },
//   });

export type GetBugetYearReport = Prisma.BudgetYearGetPayload<
  typeof GetBugetYearReportQuery
>;

// export type GetBugetYearReport = {
//   id: number;
//   year: number;
//   isActive: boolean;
//   isLocked: boolean;
//   isFinalized: boolean;
//   createdAt: Date;
//   updatedAt: Date;
//   deletedAt: Date;
//   expenses: {
//     id: number;
//     urlId: string;
//     yearId: number;
//     sector: ExpenseSector;
//     description: string;
//     budget: string; // sudah string
//     realized: string; // sudah string
//   };
//   revenues: {
//     id: number;
//     urlId: string;
//     yearId: number;
//     category: RevenueCategory;
//     description: string;
//     budget: string; // sudah string
//     realized: string; // sudah string
//   };
//   financing: {
//     id: number;
//     urlId: string;
//     yearId: number;
//     type: FinancingType;
//     description: string;
//     amount: string;
//   };
// };
