'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import { BsBagCheck, BsBagCheckFill } from 'react-icons/bs';
import { IoHomeOutline, IoHome } from 'react-icons/io5';
import { RiCustomerService2Line, RiCustomerService2Fill } from 'react-icons/ri';
import { TbSpeakerphone } from 'react-icons/tb';
import { motion } from 'framer-motion';

// Menu Data
// Kita tambahkan icon 'Active' agar ada perbedaan visual (Outline vs Fill)
const menu = [
  {
    title: 'Beranda',
    link: '/',
    icon: IoHomeOutline,
    activeIcon: IoHome,
  },
  {
    title: 'Pengaduan',
    link: '/pengaduan',
    icon: RiCustomerService2Line,
    activeIcon: RiCustomerService2Fill,
  },
  {
    title: 'Belanja',
    link: '/belanja',
    icon: BsBagCheck,
    activeIcon: BsBagCheckFill,
  },
  {
    title: 'Berita',
    link: '/berita',
    icon: TbSpeakerphone,
    activeIcon: TbSpeakerphone, // Jika icon tidak punya versi fill, pakai sama
  },
];

const MobileNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="relative flex items-center justify-around p-2 rounded-2xl bg-background/80 backdrop-blur-lg border border-border/50 shadow-2xl shadow-black/5 dark:shadow-black/20">
      {menu.map((item) => {
        const isActive = pathname === item.link;

        return (
          <Link
            key={item.title}
            href={item.link}
            className="relative z-10 w-full"
          >
            <MenuCard item={item} isActive={isActive} />
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNavigation;

// --- Sub Component Card ---
interface MenuCardProps {
  item: {
    title: string;
    icon: IconType;
    activeIcon: IconType;
    link: string;
  };
  isActive: boolean;
}

const MenuCard = ({ item, isActive }: MenuCardProps) => {
  // Pilih icon berdasarkan status aktif
  const Icon = isActive ? item.activeIcon : item.icon;

  return (
    <div className="flex flex-col items-center justify-center py-2 relative group cursor-pointer">
      {/* Animasi Background Sliding (Hanya muncul di item aktif) */}
      {isActive && (
        <motion.div
          layoutId="activeTabBackground"
          className="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-xl -z-10"
          initial={false}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}

      {/* Icon Wrapper dengan Animasi Pop */}
      <motion.div
        animate={isActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`p-1 ${
          isActive
            ? 'text-green-600 dark:text-green-400'
            : 'text-muted-foreground'
        }`}
      >
        <Icon size={22} />
      </motion.div>

      {/* Label Text */}
      <motion.span
        animate={
          isActive ? { opacity: 1, scale: 1 } : { opacity: 0.8, scale: 0.9 }
        }
        className={`text-[10px] font-medium mt-0.5 transition-colors duration-200 ${
          isActive
            ? 'text-green-700 dark:text-green-400 font-bold'
            : 'text-muted-foreground'
        }`}
      >
        {item.title}
      </motion.span>

      {/* Indikator Titik Kecil (Opsional, style iOS) */}
      {/* {isActive && (
        <motion.div 
            layoutId="activeDot"
            className="absolute -bottom-1 w-1 h-1 bg-green-600 rounded-full"
        />
      )} */}
    </div>
  );
};
