import {
  Settings,
  LayoutDashboard,
  Users,
  Newspaper,
  ClipboardPenLine,
  UsersRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Interface untuk menu item — supaya TypeScript tahu strukturnya.
 */
export interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  roles?: string[]; // jika tidak ada, berarti menu publik
}

/**
 * Daftar semua menu (centralized)
 * Kamu bisa menambahkan `roles` sesuai kebutuhan.
 */
const allMenuList: MenuItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Profile Desa',
    url: '/village',
    icon: ClipboardPenLine,
  },
  {
    title: 'Penduduk',
    url: '/residents',
    icon: UsersRound,
  },
  {
    title: 'Article',
    url: '/article',
    icon: Newspaper,
    roles: ['ADMIN', 'OPERATOR', 'EDITOR'], // hanya admin & operator
  },
  {
    title: 'Users',
    url: '/users',
    icon: Users,
    roles: ['ADMIN', 'OPERATOR'], // hanya admin & operator
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
    roles: ['ADMIN'], // hanya admin
  },
];

/**
 * Fungsi untuk memfilter menu sesuai role user.
 * Jika menu tidak punya 'roles', berarti dapat diakses semua.
 */
export function getRoleBasedMenu(role?: string): MenuItem[] {
  return allMenuList.filter((item) => {
    if (!item.roles) return true; // menu publik

    return role ? item.roles.includes(role) : false;
  });
}
