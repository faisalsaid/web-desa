'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, LogIn, Menu, Phone } from 'lucide-react';

// Import komponen Shadcn
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { GetVillageConfigType } from '../_lib/home.type';
import { useVillageStore } from '@/store/villageStore';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useSession } from 'next-auth/react';
import { Spinner } from '@/components/ui/spinner';

// Data Menu Navigasi
const navItems = [
  { name: 'Beranda', href: '/' },
  { name: 'Profil', href: '/profil' },
  { name: 'Layanan', href: '/layanan' },
  { name: 'Berita', href: '/berita' },
  { name: 'Potensi', href: '/potensi' },
  { name: 'Galeri', href: '/galeri' },
];

export type HeadOfVillage = {
  name: string;
  id: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string | null;
  imageKey: string | null;
  residentId: number | null;
  positionTypeId: number;
  startDate: Date;
  endDate: Date | null;
  parentStaffId: number | null;
} | null;

export function HeaderComp({
  initialVillage,
  initialHeadOfVillage,
}: {
  initialVillage: GetVillageConfigType | null;
  initialHeadOfVillage: HeadOfVillage;
}) {
  const { status } = useSession();

  // Tampilkan sesuatu saat sesi sedang dimuat

  const [isOpen, setIsOpen] = React.useState(false);

  const setVillage = useVillageStore((state) => state.setVillage);
  const setHeadOfVillage = useVillageStore((state) => state.setHeadOfVillage);

  const village = useVillageStore((state) => state.village);

  React.useEffect(() => {
    if (initialVillage) setVillage(initialVillage);
    if (initialHeadOfVillage) setHeadOfVillage(initialHeadOfVillage);
  }, [initialVillage, initialHeadOfVillage, setVillage, setHeadOfVillage]);

  const isAuthenticated = status === 'authenticated';

  const linkHref = isAuthenticated ? '/dashboard' : '/auth/login';
  const buttonText = isAuthenticated ? 'Dashboard' : 'Login';
  const Icon = isAuthenticated ? LayoutDashboard : LogIn;

  if (status === 'loading') {
    return (
      <nav>
        <Spinner />
      </nav>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* --- Bagian Kiri: Logo & Identitas --- */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Ganti src dengan path logo desa kamu */}
          <div className="relative h-10 w-10 md:h-12 md:w-12 transition-transform group-hover:scale-105 duration-300">
            {/* Placeholder Logo (Ganti dengan <Image /> asli) */}
            <div className="h-full w-full bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              <Image
                src="/img/logo-desa.png" // Pastikan ada file ini di folder public
                alt="Logo Desa"
                width={48}
                height={48}
                className="object-contain"
                // Fallback jika belum ada gambar, hapus className object-contain jika pakai div placeholder
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.classList.add(
                    'bg-emerald-600',
                  );
                }}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-lg md:text-xl leading-none text-foreground tracking-tight group-hover:text-emerald-600 transition-colors">
              {village?.villageName}
            </span>
            <span className="text-xs md:text-sm text-muted-foreground font-medium">
              {village?.regencyName}
            </span>
          </div>
        </Link>

        {/* --- Bagian Tengah: Desktop Navigation --- */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-emerald-600 hover:underline underline-offset-4"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Link href={linkHref}>
            <Button className="w-full" variant={'outline'}>
              <Icon />
            </Button>
          </Link>

          {/* --- Bagian Kanan: CTA & Mobile Menu --- */}
          <div className="flex items-center gap-4">
            {/* Tombol Kontak (Desktop) */}
            <div className="hidden md:block">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all hover:shadow-emerald-500/25">
                <Phone className="mr-2 h-4 w-4" /> Hubungi Kami
              </Button>
            </div>

            {/* Mobile Menu (Hamburger) */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="mb-6 text-left">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xs">
                      <Image
                        src="/img/logo-desa.png" // Pastikan ada file ini di folder public
                        alt="Logo Desa"
                        width={48}
                        height={48}
                        className="object-contain"
                        // Fallback jika belum ada gambar, hapus className object-contain jika pakai div placeholder
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement?.classList.add(
                            'bg-emerald-600',
                          );
                        }}
                      />
                    </div>
                    <span className="font-bold text-emerald-700">
                      {village?.villageName}
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-2 py-2 text-lg font-medium transition-colors hover:text-emerald-600 hover:bg-emerald-50 rounded-md"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="mt-6 p-6 border-t space-y-4">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Phone className="mr-2 h-4 w-4" /> Hubungi Kami
                    </Button>
                    <Link href={linkHref}>
                      <Button className="w-full" variant={'outline'}>
                        <Icon />
                        {buttonText}
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
