'use client';

import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';

const listMenu = [
  { key: '/#', value: 'Beranda' },
  { key: '/#', value: 'Profil Desa' },
  { key: '/#', value: 'Infografis' },
  { key: '/#', value: 'Listing' },
  { key: '/#', value: 'IMD' },
  { key: '/#', value: 'Berita' },
  { key: '/#', value: 'Belanjar' },
  { key: '/#', value: 'PPID' },
];

const MenuSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[250px] sm:w-[540px] bg-amber-800 text-white"
      >
        <SheetHeader>
          <SheetTitle>Desa Torino</SheetTitle>
        </SheetHeader>
        <Separator />

        <div className="p-4 space-y-4 text-lg font-semibold">
          {listMenu.map((item) => (
            <ul>
              <li>
                <Link href={item.key}>{item.value}</Link>
              </li>
            </ul>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
