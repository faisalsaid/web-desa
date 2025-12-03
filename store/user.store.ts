// store/user.store.ts

import { UserRole } from '@prisma/client';
import { create } from 'zustand';

// Definisikan tipe data untuk user (sesuai dengan yang diambil dari DB)
interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  role: UserRole | null;
  // ... field lain
}

// Definisikan tipe data untuk state store
interface UserStore {
  user: UserState | null;
  // State untuk melacak apakah store sudah terinisialisasi
  isInitialized: boolean;

  setUser: (user: UserState | null) => void;
  initialize: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  // Nilai awal
  user: null,
  isInitialized: false,

  // Fungsi untuk memasukkan data user dari Server Component
  setUser: (user) => set({ user: user, isInitialized: true }),

  // Fungsi untuk menandai store sudah diinisialisasi (jika perlu)
  initialize: () => set({ isInitialized: true }),
}));
