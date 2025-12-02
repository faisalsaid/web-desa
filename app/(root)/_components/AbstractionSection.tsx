'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { IconType } from 'react-icons';
import { FaPeopleGroup, FaUserCheck, FaUserClock } from 'react-icons/fa6';
import { IoIosMan, IoIosWoman } from 'react-icons/io';
import { TbTruckDelivery } from 'react-icons/tb';

// Data dengan penambahan warna tema per item
const data = [
  {
    title: 'Total Penduduk',
    value: 1893,
    Icon: FaPeopleGroup,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'group-hover:border-emerald-500/50',
  },
  {
    title: 'Laki-Laki',
    value: 1023,
    Icon: IoIosMan,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'group-hover:border-blue-500/50',
  },
  {
    title: 'Perempuan',
    value: 870,
    Icon: IoIosWoman,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    border: 'group-hover:border-rose-500/50',
  },
  {
    title: 'Kepala Keluarga',
    value: 732,
    Icon: FaUserCheck,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    border: 'group-hover:border-amber-500/50',
  },
  {
    title: 'Penduduk Sementara',
    value: 230,
    Icon: FaUserClock,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'group-hover:border-purple-500/50',
  },
  {
    title: 'Mutasi Penduduk',
    value: 127,
    Icon: TbTruckDelivery,
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    border: 'group-hover:border-cyan-500/50',
  },
];

const AbstractionSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-background">
      <div className="container mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider mb-2">
            STATISTIK DESA
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            Demografi Penduduk
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Data kependudukan terkini Desa Torino yang dikelola secara digital
            untuk transparansi dan efisiensi pelayanan publik.
          </p>
        </div>

        {/* Grid Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {data.map((item, index) => (
            <InfoCard
              key={item.title}
              title={item.title}
              icon={item.Icon}
              value={item.value}
              color={item.color}
              bg={item.bg}
              borderColor={item.border}
              delay={index * 0.1} // Stagger animation delay
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AbstractionSection;

// --- Komponen Kartu Statistik ---
interface FeatureCardProps {
  title: string;
  value: number;
  icon: IconType;
  color: string;
  bg: string;
  borderColor: string;
  delay: number;
}

const InfoCard = ({
  title,
  icon,
  value,
  color,
  bg,
  borderColor,
  delay,
}: FeatureCardProps) => {
  const Icon = icon;

  // Logic Animasi
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay }}
      className={`group relative flex flex-col items-center justify-between p-6 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-lg transition-all duration-300 ${borderColor}`}
    >
      {/* Icon Wrapper */}
      <div
        className={`mb-4 p-4 rounded-full ${bg} ${color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
      >
        <Icon size={32} />
      </div>

      {/* Counter & Title */}
      <div className="text-center space-y-1">
        <div className="text-2xl md:text-3xl font-bold text-foreground">
          {/* Panggil komponen Counter Angka */}
          <AnimatedCounter from={0} to={value} inView={isInView} />
        </div>
        <p className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wide">
          {title}
        </p>
      </div>

      {/* Dekorasi Garis Bawah */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-current ${color} rounded-t-full transition-all duration-300 group-hover:w-1/3 opacity-50`}
      />
    </motion.div>
  );
};

// --- Komponen Counter Animasi ---
const AnimatedCounter = ({
  from,
  to,
  inView,
}: {
  from: number;
  to: number;
  inView: boolean;
}) => {
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  // State lokal untuk render angka (karena motion value tidak men-trigger re-render text node secara langsung di React 18 strict mode tanpa hook tambahan kadang-kadang)
  // Tapi cara paling efisien di framer motion adalah menggunakan ref
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inView) {
      motionValue.set(to);
    }
  }, [inView, to, motionValue]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        // Format angka (misal: 1.000)
        ref.current.textContent = Math.floor(latest).toLocaleString('id-ID');
      }
    });
  }, [springValue]);

  return <span ref={ref} />;
};
