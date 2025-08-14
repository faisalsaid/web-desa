import ThemeSwitcher from '../../../components/ThemeSwitcher';
import Image from 'next/image';
import Link from 'next/link';
import MenuSheet from './MenuSheet';
import { listMenu } from '../_lib/statics';

const Header = () => {
  return (
    <header className="sticky z-50 top-0 flex items-center justify-between p-4 bg-amber-800 text-white ">
      <div className="flex gap-4 items-center justify-center">
        <div>
          <Image
            className="bg-white rounded-full"
            src={'/img/logo-desa.png'}
            alt="Logo Desa Torino"
            width={50}
            height={50}
          />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Desa Torino</h1>
          <p className="text-slate-300">Kabupaten Italia Timur</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-6">
        <nav className="hidden lg:flex gap-4 ">
          {listMenu.map((item) => (
            <ul
              key={item.value}
              className="border-b-2 border-b-transparent hover:border-b-white"
            >
              <li>
                <Link href={item.key}>{item.value}</Link>
              </li>
            </ul>
          ))}
        </nav>
        <div className="flex gap-2 items-center">
          <ThemeSwitcher />
          <div className="lg:hidden">
            <MenuSheet />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
