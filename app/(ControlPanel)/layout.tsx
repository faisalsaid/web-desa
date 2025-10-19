import { AppSidebar } from '@/app/(ControlPanel)/_component/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import CPNavbar from './_component/CP_Navbar';
import { Toaster } from 'sonner';

const layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <CPNavbar />
          <div className="p-4">{children}</div>
        </main>
      </SidebarProvider>
      <Toaster richColors position="top-center" />
    </>
  );
};

export default layout;
