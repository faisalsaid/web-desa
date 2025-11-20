import {
  Settings,
  LayoutDashboard,
  Users,
  Newspaper,
  ClipboardPenLine,
  UsersRound,
  FileUser,
  Briefcase,
  Award,
  Trees,
  GitFork,
  Columns3Cog,
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
  sub?: { title: string; url: string; icon: LucideIcon }[];
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
    roles: ['ADMIN', 'OPERATOR'],
  },
  {
    title: 'Penduduk',
    url: '/#',
    icon: UsersRound,
    roles: ['ADMIN', 'OPERATOR'],
    sub: [
      {
        title: 'Data Keluarga',
        url: '/families',
        icon: FileUser,
      },
      {
        title: 'Penduduk',
        url: '/residents',
        icon: UsersRound,
      },
    ],
  },
  {
    title: 'Organisasi',
    url: '/#',
    icon: GitFork,
    roles: ['ADMIN', 'OPERATOR'],
    sub: [
      {
        title: 'Perangkat',
        url: '/staff',
        icon: Briefcase,
      },
      {
        title: 'Jabatan',
        url: '/staff/settings',
        icon: Columns3Cog,
      },
    ],
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
