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

const OrganizationlSection = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <div className=" text-2xl font-semibold text-amber-600">SOTK</div>
        <p>Struktur Organisasi dan Tata Kerja Desa Torino</p>
      </div>
      <div className="text-shadow-amber-800">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={2}
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
          {Array.from({ length: 6 }, (_, i) => (
            <SwiperSlide key={i}>
              <ProfileCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OrganizationlSection;

const ProfileCard = () => {
  return (
    <div className="w-48 bg-amber-50/5 rounded-xl">
      <div className="p-2 rounded-lg overflow-hidden w-full">
        <div className="w-full min-h-56 bg-amber-200/5 rounded-lg flex items-center justify-center">
          <Image size={50} className="text-amber-200/30" />
        </div>
      </div>
      <div className="text-center p-2 ">
        <p className="text-lg">Jhon Doe</p>
        <p className="text-sm">Sekretaris Desa</p>
      </div>
    </div>
  );
};
