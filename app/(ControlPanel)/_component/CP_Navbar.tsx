import ThemeSwitcher from '@/components/ThemeSwitcher';
import { SidebarTrigger } from '@/components/ui/sidebar';
import UserMenu from './UserMenu';
import { auth } from '@/auth';

const CPNavbar = async () => {
  const session = await auth();
  return (
    <nav className="p-4 flex items-center justify-between sticky top-0 z-10 bg-primary-foreground">
      {/* LEFT */}
      <div className="flex gap-2 items-center">
        <SidebarTrigger className="" />
        <ThemeSwitcher />
      </div>
      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <UserMenu session={session} />
      </div>
    </nav>
  );
};

export default CPNavbar;
