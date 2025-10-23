'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft, LogIn } from 'lucide-react';
import type { Session } from 'next-auth';

interface Props {
  session: Session | null;
}

export default function UnauthorizedUI({ session }: Props) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36 }}
        className="w-full max-w-xl"
      >
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-full bg-red-50 text-red-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-lg">Akses Ditolak</CardTitle>
              <CardDescription>
                Anda tidak memiliki izin untuk melihat halaman ini.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="mt-4 grid gap-4">
            <p className="text-sm text-muted-foreground">
              Silakan masuk dengan akun yang memiliki akses, atau kembali ke
              halaman sebelumnya.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali
              </Button>

              {session ? (
                <Link href="/dashboard" className="inline-block">
                  <Button className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/auth/login" className="inline-block">
                  <Button className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Keluar
                  </Button>
                </Link>
              )}

              <Link href="/" className="inline-block ml-auto">
                <Button variant="ghost">Ke Halaman Utama</Button>
              </Link>
            </div>

            <div className="text-xs text-muted-foreground">
              Jika Anda yakin ini sebuah kesalahan, hubungi administrator atau
              coba hapus cache dan masuk kembali.
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
