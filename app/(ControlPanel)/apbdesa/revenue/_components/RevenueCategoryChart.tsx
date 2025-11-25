'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { RevenueCategoryOptions } from '@/lib/enum';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { RevenueCategoryType } from '../page';
import { RevenueCategory } from '@prisma/client';

export const description = 'A multiple bar chart';

const chartConfig = {
  budget: {
    label: 'Budget',
    color: 'var(--chart-1)',
  },
  realized: {
    label: 'Realized',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export function RevenueCategoryChart({
  category,
}: {
  category: RevenueCategoryType[];
}) {
  const chartData = category.map((item) => ({
    category: RevenueCategoryOptions[item.category as RevenueCategory],
    budget: item.totalBudget,
    realized: item.totalRealized,
  }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Category</CardTitle>
        <div></div>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-32">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="budget" fill="var(--color-budget)" radius={4} />
            <Bar dataKey="realized" fill="var(--color-realized)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
