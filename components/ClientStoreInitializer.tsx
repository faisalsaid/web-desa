// components/ClientStoreInitializer.tsx

'use client';

import { useEffect, useRef } from 'react';
import { useUserStore } from '@/store/user.store';
import { UserRole } from '@prisma/client';

// Definisikan tipe props sesuai dengan data user dari Server
interface UserData {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  // ... field lain
}

interface ClientStoreInitializerProps {
  // Terima data pengguna lengkap, bisa null jika belum login
  user: UserData | null;
}

export default function ClientStoreInitializer({
  user,
}: ClientStoreInitializerProps) {
  // Ambil fungsi setUser dari store
  const { setUser } = useUserStore();

  // Gunakan useRef untuk memastikan inisialisasi hanya terjadi sekali per render
  // selama siklus hidup komponen ini.
  const initialized = useRef(false);

  useEffect(() => {
    // Pastikan inisialisasi hanya berjalan sekali, meskipun komponen me-render ulang
    if (!initialized.current) {
      // 4. Masukkan data ke Zustand Store
      setUser(user);
      initialized.current = true;
      console.log(
        'Zustand store berhasil diinisialisasi dengan data pengguna.',
      );
    }
  }, [user, setUser]);

  // Komponen ini tidak perlu me-render apapun
  return null;
}
