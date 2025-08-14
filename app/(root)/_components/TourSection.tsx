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

import Link from 'next/link';
import { useSwiperLength } from '../_lib/SwiperLength';
import { Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

const TourSection = () => {
  const length = useSwiperLength();
  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <div className=" text-2xl font-semibold text-amber-600  md:text-5xl">
          Pariwisata
        </div>
        <p>
          Layanan yang mempermudah promosi wisata Desa sehingga dapat menarik
          pengunjung Desa
        </p>
      </div>
      <div className="">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={16}
          slidesPerView={length}
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
              <TourCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex items-center justify-end text-sm">
        <Link className="text-muted-foreground" href={'/'}>
          See All
        </Link>
      </div>
    </div>
  );
};

export default TourSection;

const TourCard = () => {
  const source =
    'https://images.unsplash.com/photo-1611952327309-a739d089f5ad?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return (
    <div className="rounded-xl overflow-hidden bg-muted">
      <div className="w-full min-h-48 bg-amber-700/20 rounded-lg relative overflow-hidden">
        {source ? (
          <Image
            src={source}
            alt="Portrait"
            // width={300}
            // height={700}
            className="object-cover w-full h-full"
            fill
          />
        ) : (
          <ImageIcon size={50} className="text-amber-800" />
        )}
      </div>
    </div>
  );
};
