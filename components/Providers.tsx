// components/Providers.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
// Import tipe ReactNode dari 'react' untuk properti children
import React, { ReactNode } from 'react';

// Definisikan tipe untuk properti komponen (Props)
interface ProvidersProps {
  // 'children' adalah properti yang mewakili elemen-elemen React yang dibungkus oleh komponen ini.
  children: ReactNode;
}

// Gunakan tipe ProvidersProps untuk komponen fungsional
export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      {/* Semua komponen anak yang dilewatkan */}
      {children}
    </SessionProvider>
  );
}
