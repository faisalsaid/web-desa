// _components/VillageProvider.tsx
'use client';

import { ReactNode } from 'react';
import { GetVillageConfigType } from './home.type';
import { VillageContext } from './VillageContext';

interface Props {
  village: GetVillageConfigType | null;
  children: ReactNode;
}

export default function VillageProvider({ village, children }: Props) {
  return (
    <VillageContext.Provider value={village}>
      {children}
    </VillageContext.Provider>
  );
}
