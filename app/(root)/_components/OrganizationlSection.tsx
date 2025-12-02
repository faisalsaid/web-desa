'use client';

// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

import { useState, useEffect } from 'react';
// import Image from 'next/image';
import { TStaffForHome } from '../_lib/home.type';
import ImageWrapper from '@/components/ImageWraper';

const OrganizationlSection = ({ allStaff }: { allStaff: TStaffForHome[] }) => {
  const [nilai, setNilai] = useState<number>(2);

  useEffect(() => {
    function updateNilai() {
      if (window.matchMedia('(min-width: 1536px)').matches) {
        setNilai(6); // 2xl
      } else if (window.matchMedia('(min-width: 1280px)').matches) {
        setNilai(6); // xl
      } else if (window.matchMedia('(min-width: 1024px)').matches) {
        setNilai(6); // lg
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        setNilai(4); // md
      } else if (window.matchMedia('(min-width: 640px)').matches) {
        setNilai(2); // sm
      } else {
        setNilai(2); // default
      }
    }

    updateNilai();
    window.addEventListener('resize', updateNilai);
    return () => window.removeEventListener('resize', updateNilai);
  }, []);

  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <div className=" text-2xl font-semibold text-green-600 md:text-5xl">
          SOTK
        </div>
        <p>Struktur Organisasi dan Tata Kerja Desa Torino</p>
      </div>
      <div>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={10}
          slidesPerView={nilai}
          loop={true}
          //   navigation
          pagination={{ clickable: true }}
          //   scrollbar={{ draggable: true }}
          //   onSwiper={(swiper) => console.log(swiper)}
          //   onSlideChange={() => console.log('slide change')}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          freeMode={{
            enabled: true,
            momentum: false,
          }}
        >
          {allStaff.map((staff) => (
            <SwiperSlide key={staff.id}>
              <ProfileCard staff={staff} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex items-center justify-end text-sm ">
        <Link className="text-muted-foreground" href={'/'}>
          See All
        </Link>
      </div>
    </div>
  );
};

export default OrganizationlSection;

const ProfileCard = ({ staff }: { staff: TStaffForHome }) => {
  return (
    <div className="bg-green-500/20 rounded-xl">
      <div className="p-2 rounded-lg overflow-hidden w-full">
        <div className="w-full h-48 bg-green-700/20 rounded-lg relative overflow-hidden">
          {staff.imageUrl !== '' ? (
            <ImageWrapper
              src={staff.imageUrl as string}
              alt={`foto profil ${staff.name}`}
              objectFit="cover"
            />
          ) : (
            <ImageIcon size={50} className="text-amber-800" />
          )}
        </div>
      </div>
      <div className="text-center p-2 ">
        <p className="line-clamp-1">{staff.name}</p>
        <p className="text-xs">{staff.positionType.name}</p>
      </div>
    </div>
  );
};
