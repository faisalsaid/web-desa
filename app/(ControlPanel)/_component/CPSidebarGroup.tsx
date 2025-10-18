import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

type Menu = {
  title: string;
  url: string;
  icon: LucideIcon;
};

interface Props {
  title: string;
  listMenu: Menu[];
}

const CPSidebarGroup = ({ title, listMenu }: Props) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="capitalize">{title}</SidebarGroupLabel>
      <SidebarContent>
        <SidebarMenu>
          {listMenu.map((menu) => (
            <SidebarMenuItem key={menu.title}>
              <SidebarMenuButton asChild>
                <Link href={menu.url}>
                  <menu.icon />
                  <span>{menu.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </SidebarGroup>
  );
};

export default CPSidebarGroup;
