'use client';

import Link from 'next/link';
import { IconType } from 'react-icons';
import { BsBagCheck } from 'react-icons/bs';
import { IoHomeOutline } from 'react-icons/io5';
import { RiCustomerService2Line } from 'react-icons/ri';
import { TbSpeakerphone } from 'react-icons/tb';

const menu = [
  { title: 'Beranda', link: 'beranda', icon: IoHomeOutline },
  { title: 'Pengaduan', link: 'pengaduan', icon: RiCustomerService2Line },
  { title: 'Belanja', link: 'belanja', icon: BsBagCheck },
  { title: 'Berita', link: 'berita', icon: TbSpeakerphone },
];

const MobileNavigation = () => {
  return (
    <div className="flex itce justify-around p-4 border  rounded-xl bg-muted text-muted-foreground shadow-md">
      {menu.map((item) => (
        <MenuCard
          key={item.title}
          title={item.title}
          icon={item.icon}
          link={item.link}
        />
      ))}
    </div>
  );
};

export default MobileNavigation;

interface FeatureCardProps {
  title: string;
  icon: IconType;
  link: string;
}
const MenuCard = ({ title, icon, link }: FeatureCardProps) => {
  const Icon = icon;

  return (
    <Link href={link}>
      <div className="flex flex-col items-center gap-2 ">
        <Icon size={24} />
        <p className="text-xs">{title}</p>
      </div>
    </Link>
  );
};
