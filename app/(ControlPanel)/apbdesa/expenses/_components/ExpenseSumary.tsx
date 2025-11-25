'use client';

import { formatCurrency, formatCurrencyShort } from '@/lib/utils/helper';
import { ExpenseSummaryArray, ExpenseSummaryItem } from '../page';
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';
import { PercentageDonut } from '../../revenue/_components/RevenueSummary';
import { Separator } from '@/components/ui/separator';
import { ExpenseSector } from '@prisma/client';

const ExpenseSumaryComp = ({ summary }: { summary: ExpenseSummaryArray }) => {
  return (
    <div className="bg-background p-3 rounded-xl space-y-3">
      <div className=" text-lg font-semibold">Rangkuman</div>
      <div className="bg-muted p-3 rounded-lg text-muted-foreground space-y-2 ">
        <div className="flex items-center justify-between sm:text-lg">
          <div className="space-y-1 font-semibold sm:flex sm:gap-2">
            <div className="flex items-center gap-2 text-lime-500">
              {/* <span>Pendapatan {'(Rp)'}</span> */}
              <span>Rp. {formatCurrency(summary.totalBudget)}</span>
              <BanknoteArrowDown />
            </div>
            <div className="flex items-center gap-4 text-sky-400 bg-">
              {/* <span>Realisasi {'(Rp)'}</span> */}
              <span>Rp. {formatCurrency(summary.totalRealized)}</span>
              <BanknoteArrowUp />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <PercentageDonut
              percentage={Math.floor(summary.percent)}
              size={75}
              bgColor="text-muted"
            />
          </div>
        </div>
        <Separator className="bg-lime-100/30" />
        <div className="text-xs space-y-1 sm:grid grid-cols-5 sm:gap-3">
          {summary.sectors.map((sector) => {
            const categoryColors: Record<ExpenseSector, string> = {
              COMMUNITY_GUIDANCE: 'bg-orange-400 ',
              DEVELOPMENT: 'bg-purple-400 ',
              EMERGENCY: 'bg-sky-300 ',
              EMPOWERMENT: 'bg-teal-400 ',
              GOVERNMENT_ADMIN: 'bg-slate-400 ',
            };
            return (
              <div key={sector.sector}>
                <div className=" sm:hidden">
                  <SectorCard
                    data={sector}
                    color={categoryColors[sector.sector]}
                  />
                </div>
                <div className="hidden sm:block">
                  <SectorCardB
                    data={sector}
                    color={categoryColors[sector.sector]}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExpenseSumaryComp;

const SectorCard = ({
  data,
  color,
}: {
  data: ExpenseSummaryItem;
  color: string;
}) => {
  return (
    <div key={data.sector} className="flex items-center gap-2 justify-between">
      <div className="flex gap-1 items-center">
        <div className={`${color} size-2 border-0 `}></div>
        <p>{data.label}</p>
      </div>
      <div className="flex gap-3">
        <div className="flex gap-1">
          <p className="text-lime-500">{formatCurrencyShort(data.budget)}</p> /
          <p className="text-sky-500">{formatCurrencyShort(data.realized)}</p>
        </div>
        <p className="text-lime-500">{Math.floor(data.percent)} %</p>
      </div>
    </div>
  );
};

const SectorCardB = ({
  data,
  color,
}: {
  data: ExpenseSummaryItem;
  color: string;
}) => {
  return (
    <div className="min-h-32 flex flex-col justify-between">
      <div>
        <p>{data.label}</p>
        <p className="text-2xl font-semibold">{data.percent}%</p>
      </div>
      <div className="text-muted-foreground space-y-1">
        <p>Rp. {formatCurrency(data.budget)}</p>
        <p>Rp. {formatCurrency(data.realized)}</p>
        <div className={`h-2 ${color}`}></div>
      </div>
    </div>
  );
};
