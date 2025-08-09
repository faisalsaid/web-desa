'use client';

import { IconType } from 'react-icons';
import { BsBagCheck } from 'react-icons/bs';
import { IoHomeOutline } from 'react-icons/io5';
import { RiCustomerService2Line } from 'react-icons/ri';
import { TbSpeakerphone } from 'react-icons/tb';

const menu = [
  { title: 'Beranda', icon: IoHomeOutline },
  { title: 'Pengaduan', icon: RiCustomerService2Line },
  { title: 'Belanja', icon: BsBagCheck },
  { title: 'Berita', icon: TbSpeakerphone },
];

const MobileNavigation = () => {
  return (
    <div className="flex itce justify-around p-4 border  rounded-xl bg-muted text-muted-foreground shadow-md">
      {menu.map((item) => (
        <MenuCard key={item.title} title={item.title} icon={item.icon} />
      ))}
    </div>
  );
};

export default MobileNavigation;

interface FeatureCardProps {
  title: string;
  icon: IconType;
}
const MenuCard = ({ title, icon }: FeatureCardProps) => {
  const Icon = icon;

  return (
    <div className="flex flex-col items-center gap-2 ">
      <Icon size={24} />
      <p className="text-xs">{title}</p>
    </div>
  );
};
