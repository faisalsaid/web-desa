import { HeadOfVillage } from '@/app/(root)/_components/HeaderComp';
import { GetVillageConfigType } from '@/app/(root)/_lib/home.type';
import { create } from 'zustand';

interface VillageDataState {
  village: GetVillageConfigType | null;
  setVillage: (village: GetVillageConfigType) => void;
  headOfVillage: HeadOfVillage | null;
  setHeadOfVillage: (headOfVillage: HeadOfVillage) => void;
}

export const useVillageStore = create<VillageDataState>((set) => ({
  village: null,
  headOfVillage: null,
  setVillage: (village) => set({ village }),
  setHeadOfVillage: (headOfVillage) => set({ headOfVillage }),
}));
