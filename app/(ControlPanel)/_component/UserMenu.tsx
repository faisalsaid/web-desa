'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOutIcon, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Session } from 'next-auth';
// import { CurrentUser } from '../../_lib/UserProvider';

interface Props {
  session: Session | null;
}

const UserMenu = ({ session }: Props) => {
  const curentUser = session?.user;
  return (
    <div className="flex gap-2 items-center">
      <div>
        <p>{curentUser?.email}</p>
        <p className="text-xs text-muted-foreground">{curentUser?.role}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="hover:cursor-pointer">
            <AvatarImage src={curentUser?.image as string} alt={'profile'} />
            <AvatarFallback>!</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10}>
          <DropdownMenuLabel>
            <div className=" sm:hidden">
              <p className="capitalize line-clamp-1 ">{curentUser?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {curentUser?.role.toLocaleLowerCase()}
              </p>
            </div>
            <p className="hidden sm:block">My Account</p>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <Link href={'/profile'}>
            <DropdownMenuItem>
              <User className="h-[1.2rem] w-[1.2rem] mr-2" />
              Profile
            </DropdownMenuItem>
          </Link>
          {/* <Link href={'/room'}>
          <DropdownMenuItem>
            <House className="h-[1.2rem] w-[1.2rem] mr-2" />
            My Room
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
          Settings
        </DropdownMenuItem> */}
          <DropdownMenuItem variant="destructive">
            <Button
              onClick={() => signOut({ redirectTo: '/' })}
              variant={'outline'}
            >
              <LogOutIcon className="h-[1.2rem] w-[1.2rem] mr-2" />
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
