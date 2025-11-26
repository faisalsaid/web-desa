// lib/queries/financing.ts
import { FinancingType, Prisma } from '@prisma/client';

// ============================
//  Base query definition
// ============================

export const getFinancingQuery =
  Prisma.validator<Prisma.FinancingFindManyArgs>()({
    select: {
      id: true,
      urlId: true,
      type: true,
      yearId: true,
      description: true,
      amount: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,

      year: {
        select: {
          id: true,
          year: true,
          isLocked: true,
        },
      },
    },
  });

// ============================
//  Inferred TypeScript Type
// ============================

// export type FinancingResult = Prisma.FinancingGetPayload<
//   typeof getFinancingQuery
// >;

export type FinancingResult = {
  id: number;
  urlId: string;
  type: FinancingType;
  description: string;
  amount: string;
  yearId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  year: {
    id: number;
    year: number;
    isLocked: boolean;
  };
};

export type FinancingList = FinancingResult[];

export interface FinancingDataTableParams {
  page: number;
  limit: number;
  search?: string;
  yearId?: number;
  financeType?: string;
}
