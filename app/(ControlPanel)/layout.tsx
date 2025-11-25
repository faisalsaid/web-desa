import { AppSidebar } from '@/app/(ControlPanel)/_component/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import CPNavbar from './_component/CP_Navbar';
import { cookies } from 'next/headers';

const layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <>
      <SidebarProvider
        defaultOpen={defaultOpen}
        style={
          {
            '--sidebar-width': '12rem',
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <main className="w-full">
          <CPNavbar />
          <div className="p-4 bg-primary-foreground">{children}</div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default layout;
