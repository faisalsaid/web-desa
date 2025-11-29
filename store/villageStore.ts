import { VillageConfigType } from '@/app/(ControlPanel)/village/_lib/villageConfig.type';
import { GetVillageConfigType } from '@/app/(root)/_lib/home.type';
import { create } from 'zustand';

interface VillageDataState {
  village: GetVillageConfigType | null;
  setVillage: (village: GetVillageConfigType) => void;
}

export const useVillageStore = create<VillageDataState>((set) => ({
  village: null,
  setVillage: (village) => set({ village }),
}));
