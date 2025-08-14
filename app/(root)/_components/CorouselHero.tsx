'use client';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
export function CarouselDemo() {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={8000}
      >
        <SwiperSlide className="w-full">
          <div className="aspect-video">
            <Image
              src={'/img/hut_ri_80.png'}
              width={1537}
              height={1024}
              alt="image hero"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="aspect-video">
            <Image
              src={'/img/hut_ri_80.png'}
              width={1537}
              height={1024}
              alt="image hero"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="aspect-video">
            <Image
              src={'/img/hut_ri_80.png'}
              width={1537}
              height={1024}
              alt="image hero"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
