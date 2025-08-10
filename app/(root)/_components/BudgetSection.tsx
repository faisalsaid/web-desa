import { IconType } from 'react-icons';

import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { MdOutlinePayments } from 'react-icons/md';
import { FaMoneyBills } from 'react-icons/fa6';

const BudgetSection = () => {
  const data = [
    { title: 'Pendapatan', value: 'Rp. 4.802.205.800,-', icon: GiReceiveMoney },
    { title: 'Penerimaan', value: 'Rp. 86.205.800,-', icon: FaMoneyBills },
    { title: 'Belanja', value: 'Rp. 4.802.205.800,-', icon: GiPayMoney },
    {
      title: 'Pengeluaran',
      value: 'Rp. 86.205.800,-',
      icon: MdOutlinePayments,
    },
  ];
  return (
    <div className="space-y-4">
      <div className="text-center ">
        <h5 className="text-2xl font-semibold text-amber-800">APB DESA 2024</h5>
        <p className="text-muted-foreground">
          Akses cepat dan transparan terhadap APB Desa serta proyek pembangunan
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {data.map((item) => (
          <BudgetCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default BudgetSection;

interface FeatureCardProps {
  title: string;
  value: string;
  icon: IconType;
}
const BudgetCard = ({ title, value, icon }: FeatureCardProps) => {
  const Icon = icon;
  const style =
    title === 'Pendapatan' || title === 'Penerimaan'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';

  const styleText =
    title === 'Pendapatan' || title === 'Penerimaan'
      ? ' text-green-800'
      : ' text-red-800';
  return (
    <div className="space-y-2 text-center flex flex-col items-center">
      <div
        className={`flex items-center flex-col p-4 border w-fit rounded-lg min-w-26 ${style}`}
      >
        <Icon size={30} />
        <p className="text-xs">{title}</p>
      </div>
      <p className={`font-bold text-lg ${styleText}`}>{value}</p>
    </div>
  );
};
