'use client';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RevenueCategoryOptions } from '@/lib/staticData';
import { formatCurrency } from '@/lib/utils/helper';
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';
import { RevenueSummaryType } from '../page';

interface Props {
  summary: RevenueSummaryType;
}

const RevenueSummary = ({ summary }: Props) => {
  return (
    // <div className="bg-linear-to-tl from-lime-200 to-lime-600 p-2 rounded-xl space-y-2">
    <div className="bg-background p-3 rounded-xl space-y-3">
      <div className=" text-lg font-semibold">Rangkuman</div>
      <div className="bg-muted p-3 rounded-lg text-muted-foreground space-y-2 ">
        <div className="flex gap-2 items-center justify-between">
          <div className="space-y-3 font-semibold">
            <div className="flex items-center gap-2 text-lime-500">
              {/* <span>Pendapatan {'(Rp)'}</span> */}
              <span>Rp. {formatCurrency(summary.totalBudget)}</span>
              <BanknoteArrowDown />
            </div>
            <div className="flex items-center gap-2 text-sky-400">
              {/* <span>Realisasi {'(Rp)'}</span> */}
              <span>Rp. {formatCurrency(summary.totalRealized)}</span>
              <BanknoteArrowUp />
            </div>
          </div>
          <PercentageDonut
            percentage={summary.percentage}
            size={65}
            bgColor="text-muted"
          />
        </div>
        <Separator className="bg-lime-100/30" />
        <div className="flex gap-4 items-center justify-center text-xs ">
          {summary.category.map((category) => {
            const res = RevenueCategoryOptions.find(
              (p) => p.value === category.category,
            );

            const categoryColors: Record<string, string> = {
              OWN_SOURCE: 'bg-orange-400 ',
              TRANSFER: 'bg-purple-400 ',
              OTHER: 'bg-slate-400 ',
            };
            return (
              <Badge
                key={category.category}
                className={`flex items-center gap-1 text-slate-50 ${
                  categoryColors[category.category]
                }`}
              >
                <p>{res?.label}</p> :<p>{category.items}</p>
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RevenueSummary;

interface PercentageDonutProps {
  percentage: number; // 0 - 100
  size?: number; // px
  strokeWidth?: number;
  color?: string; // Tailwind color class (e.g. "text-lime-500")
  bgColor?: string; // background circle color
}

export const PercentageDonut: React.FC<PercentageDonutProps> = ({
  percentage,
  size = 80,
  strokeWidth = 10,
  color = 'text-lime-500',
  bgColor = 'text-background',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          className={bgColor}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* Progress circle */}
        <circle
          className={color + ' transition-all duration-500 ease-out'}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>

      {/* Teks persentase */}
      <div className="absolute font-semibold text-sm">{percentage}%</div>
    </div>
  );
};
