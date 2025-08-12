import { FaBuildingColumns } from 'react-icons/fa6';
import { FaChartBar } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { LuNewspaper } from 'react-icons/lu';
import { TbSpeakerphone } from 'react-icons/tb';
import { BsBagCheck } from 'react-icons/bs';
import { LuPackageCheck } from 'react-icons/lu';
import { PiImages } from 'react-icons/pi';
import { RiListIndefinite } from 'react-icons/ri';
import Link from 'next/link';

const menu = [
  { title: 'Profil Desa', icon: FaBuildingColumns },
  { title: 'Info Grafis', icon: FaChartBar },
  { title: 'IDM', icon: RiListIndefinite },
  { title: 'PPID', icon: LuNewspaper },
  { title: 'Berita', icon: TbSpeakerphone },
  { title: 'Belanja', icon: BsBagCheck },
  { title: 'Bansos', icon: LuPackageCheck },
  { title: 'Galeri', icon: PiImages },
];

const FeatureSection = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {menu.map((item) => (
        <FetureCard key={item.title} title={item.title} icon={item.icon} />
      ))}
    </div>
  );
};

export default FeatureSection;

interface FeatureCardProps {
  title: string;
  icon: IconType;
}

const FetureCard = ({ title, icon }: FeatureCardProps) => {
  const Icon = icon;
  return (
    <div className="flex items-center flex-col space-y-2 ">
      <div className="h-16 md:h-32 aspect-square bg-amber-500 rounded-xl flex items-center justify-center text-white">
        <Icon className="h-[30px] w-[30px] md:w-[60px] md:h-[60px]" />
      </div>
      <p className="text-xs md:text-lg">
        <Link href={'#'}>{title}</Link>
      </p>
    </div>
  );
};
