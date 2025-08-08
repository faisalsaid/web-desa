import { AlignJustify } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-amber-800 text-white ">
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
          <h1 className="text-xl">Desa Torino</h1>
          <p>Kabupaten Italia Timur</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <ThemeSwitcher />
        <AlignJustify />
      </div>
    </header>
  );
};

export default Header;
