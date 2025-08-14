import { IconType } from 'react-icons';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoIosMan, IoIosWoman } from 'react-icons/io';
import { FaUserCheck } from 'react-icons/fa6';
import { FaUserClock } from 'react-icons/fa6';
import { TbTruckDelivery } from 'react-icons/tb';

const data = [
  {
    title: 'Penuduk',
    value: 1893,
    Icon: FaPeopleGroup,
  },
  {
    title: 'Laki Laki',
    value: 1023,
    Icon: IoIosMan,
  },
  {
    title: 'Perempuan',
    value: 870,
    Icon: IoIosWoman,
  },
  {
    title: 'Kepala Keluarga',
    value: 732,
    Icon: FaUserCheck,
  },
  {
    title: 'Penduduk Sementara',
    value: 230,
    Icon: FaUserClock,
  },
  {
    title: 'Mutasi penduduk',
    value: 127,
    Icon: TbTruckDelivery,
  },
];

const AbstractionSection = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <h5 className="text-xl font-semibold text-amber-600 md:text-5xl">
          Abstraksi Penduduk
        </h5>
        <p className="text-muted-foreground">
          Sistem digital yang berfungsi mempermudah pengelolaan data dan
          informasi terkait dengan kependudukan dan pendayagunaannya untuk
          pelayanan publik yang efektif dan efisien
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data.map((item) => (
          <InfoCard
            key={item.title}
            title={item.title}
            icon={item.Icon}
            value={item.value}
          />
        ))}
      </div>
    </div>
  );
};

export default AbstractionSection;

interface FeatureCardProps {
  title: string;
  value: number;
  icon: IconType;
}

const InfoCard = ({ title, icon, value }: FeatureCardProps) => {
  const Icon = icon;

  return (
    <div className=" text-center p-4 bg-amber-400/30 rounded-xl space-y-4">
      <div className="flex items-center flex-col">
        <Icon className="text-amber-900" size={50} />
        <p className="text-xs text-muted-foreground">{title}</p>
      </div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
};
