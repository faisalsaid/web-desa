import { AppSidebar } from '@/app/(ControlPanel)/_component/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import CPNavbar from './_component/CP_Navbar';

const layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <SidebarProvider>
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
