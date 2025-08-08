import { AlignJustify } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <div>
        <div>Logo</div>
        <h1>Desa Torino</h1>
        <p>Kabupaten Italia Timur</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <ThemeSwitcher />
        <AlignJustify />
      </div>
    </header>
  );
};

export default Header;
