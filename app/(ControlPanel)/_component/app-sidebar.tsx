import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import CPSidebarGroup from './CPSidebarGroup';
// import { adminMenuList } from '../_lib/listSidebar';
import { auth } from '@/auth';
import { getRoleBasedMenu } from '../_lib/menuUtils';
import { GalleryVerticalEnd } from 'lucide-react';

export async function AppSidebar() {
  // console.log('SIDEBAR');

  const session = await auth();
  const role = session?.user?.role as string;

  // console.log('USER ROLE', role);

  const filteredMenu = getRoleBasedMenu(role.toUpperCase());

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div>
                <GalleryVerticalEnd />
                <Link href={'/dashboard'}>Website Desa</Link>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSeparator />
        <CPSidebarGroup listMenu={filteredMenu} title="admin" />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
