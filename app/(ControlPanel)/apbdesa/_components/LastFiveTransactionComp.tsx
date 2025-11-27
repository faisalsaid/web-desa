'use client';

import { APBTransactionItem } from '../_lib/apbdesa.type';

const LastFiveTransactionComp = ({ data }: { data: APBTransactionItem[] }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">3 Transaksi Terbaru</h2>

      <ul className="space-y-2">
        {data.map((t) => (
          <li key={t.urlId} className="border rounded-lg bg-muted p-3">
            <div className="text-xs text-muted-foreground flex items-center justify-between">
              <p> {t.type}</p>
              <p> {t.createdAt.toLocaleDateString('id-ID')}</p>
            </div>
            <div className="font-base">{t.description}</div>
            <div className="flex items-baseline gap-4 justify-between">
              <div className="text-xs text-muted-foreground">
                {t.categoryOrSector}
              </div>
              <div className="text-green-600">
                Rp {t.amount.toLocaleString()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastFiveTransactionComp;
