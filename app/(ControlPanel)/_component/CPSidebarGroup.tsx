import {
  // Sidebar,
  // SidebarFooter,
  // SidebarGroupAction,
  // SidebarGroupContent,
  // SidebarHeader,
  // SidebarMenuBadge,
  // SidebarSeparator,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

type Menu = {
  title: string;
  url: string;
  icon: LucideIcon;
  sub?: { title: string; url: string; icon: LucideIcon }[];
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
          {listMenu.map((menu) =>
            menu.sub ? (
              <Collapsible key={menu.title}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <CollapsibleTrigger asChild>
                      <Link href={'#'}>
                        <menu.icon />
                        <span>{menu.title}</span>
                      </Link>
                    </CollapsibleTrigger>
                  </SidebarMenuButton>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        {menu.sub.map((item) => (
                          <SidebarMenuSubButton asChild key={item.title}>
                            <Link href={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                            {/* {item.title} */}
                          </SidebarMenuSubButton>
                        ))}
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={menu.title}>
                <SidebarMenuButton asChild>
                  <Link href={menu.url}>
                    <menu.icon />
                    <span>{menu.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ),
          )}
        </SidebarMenu>
      </SidebarContent>
    </SidebarGroup>
  );
};

export default CPSidebarGroup;
