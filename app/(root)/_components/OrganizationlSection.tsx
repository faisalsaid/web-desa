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
import { Image } from 'lucide-react';
import Link from 'next/link';

import { useState, useEffect } from 'react';

const OrganizationlSection = () => {
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
        <div className=" text-2xl font-semibold text-amber-600">SOTK</div>
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
          {Array.from({ length: 7 }, (_, i) => (
            <SwiperSlide key={i}>
              <ProfileCard />
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

const ProfileCard = () => {
  return (
    <div className="bg-amber-500/20 rounded-xl">
      <div className="p-2 rounded-lg overflow-hidden w-full">
        <div className="w-full min-h-56 bg-amber-700/20 rounded-lg flex items-center justify-center">
          <Image size={50} className="text-amber-800" />
        </div>
      </div>
      <div className="text-center p-2 ">
        <p className="text-lg">Jhon Doe</p>
        <p className="text-sm">Sekretaris Desa</p>
      </div>
    </div>
  );
};
