'use client';

import ThemeSwitcher from '../../../components/ThemeSwitcher';
import Image from 'next/image';
import Link from 'next/link';
import MenuSheet from './MenuSheet';
import { listMenu } from '../_lib/statics';
import { GetVillageConfigType } from '../_lib/home.type';
import { useVillageStore } from '@/store/villageStore';
import { useEffect } from 'react';

export type HeadOfVillage = {
  name: string;
  id: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string | null;
  residentId: number | null;
  positionTypeId: number;
  startDate: Date;
  endDate: Date | null;
  parentStaffId: number | null;
} | null;

const Header = ({
  initialVillage,
  initialHeadOfVillage,
}: {
  initialVillage: GetVillageConfigType | null;
  initialHeadOfVillage: HeadOfVillage;
}) => {
  const setVillage = useVillageStore((state) => state.setVillage);
  const setHeadOfVillage = useVillageStore((state) => state.setHeadOfVillage);

  const village = useVillageStore((state) => state.village);

  useEffect(() => {
    if (initialVillage) setVillage(initialVillage);
    if (initialHeadOfVillage) setHeadOfVillage(initialHeadOfVillage);
  }, [initialVillage, initialHeadOfVillage, setVillage, setHeadOfVillage]);

  return (
    <header className="bg-green-600 sticky z-50 top-0">
      <div className="container mx-auto flex items-center justify-between p-4  text-white">
        <div className="flex gap-4 items-center justify-center">
          <div>
            <Image
              className=""
              src={'/img/logo-desa.png'}
              alt="Logo Desa Torino"
              width={50}
              height={50}
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold">
              {village?.villageName ? village.villageName : 'Desa Torino'}
            </h1>
            <p className="text-slate-300">
              {village?.regencyName ? village.regencyName : 'Kabupaten Torino'}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6">
          <nav className="hidden lg:flex gap-4 ">
            {listMenu.map((item) => (
              <ul
                key={item.value}
                className="border-b-2 border-b-transparent hover:border-b-white"
              >
                <li>
                  <Link href={item.key}>{item.value}</Link>
                </li>
              </ul>
            ))}
          </nav>
          <div className="flex gap-2 items-center">
            <ThemeSwitcher />
            <div className="lg:hidden">
              <MenuSheet />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
