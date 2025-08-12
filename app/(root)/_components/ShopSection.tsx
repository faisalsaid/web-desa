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
import { swiperLenght } from '../_lib/SwiperLength';

const ShopSection = () => {
  const length = swiperLenght();

  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <div className=" text-2xl font-semibold text-amber-600  md:text-5xl">
          Beli Dari Desa
        </div>
        <p>
          Layanan yang disediakan promosi produk UMKM Desa sehingga mampu
          meningkatkan perekonomian masyarakat Desa
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
              <ShopCard />
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

export default ShopSection;

const ShopCard = () => {
  return (
    <div className=" rounded-xl overflow-hidden bg-muted">
      <div className="bg-amber-600 w-full h-56 flex items-center justify-center rounded-xl">
        Image
      </div>
      <div className="p-4 space-y-3">
        <h5>Nama Produk UMKM Desa</h5>
        <div className="flex items-center  gap-6 text-xs text-muted-foreground">
          <div className="flex items-center justify-center gap-1">
            Rp. 100.000,-
          </div>
        </div>
      </div>
    </div>
  );
};
