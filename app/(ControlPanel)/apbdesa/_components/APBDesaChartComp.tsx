'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

interface SummaryProps {
  data: {
    year: number;
    totals: {
      revenue: { budget: string; realized: string; percentage: number };
      expense: { budget: string; realized: string; percentage: number };
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
  }[];
}

export function APBDesaChartComp({ data }: SummaryProps) {
  const chartData = data.map((item) => ({
    year: item.year,
    pendapatan: Number(item.totals.revenue.realized),
    belanja: Number(item.totals.expense.realized),
    pembiayaan: Number(item.totals.financing.netFinancing),
  }));

  return (
    <div className="w-full h-80 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pendapatan" fill="#4ade80" radius={[4, 4, 0, 0]} />
          <Bar dataKey="belanja" fill="#f87171" radius={[4, 4, 0, 0]} />
          <Bar dataKey="pembiayaan" fill="#60a5fa" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
