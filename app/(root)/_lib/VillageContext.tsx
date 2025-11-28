'use client';

// _lib/VillageContext.tsx
import { createContext, useContext } from 'react';
import { GetVillageConfigType } from './home.type';

export const VillageContext = createContext<GetVillageConfigType | null>(null);

export const useVillage = () => useContext(VillageContext);
