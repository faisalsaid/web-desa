'use client';

import Link from 'next/link';
import { ArrowRight, User } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

// Import Components
import ImageWrapper from '@/components/ImageWraper';
import { Button } from '@/components/ui/button'; // Pastikan punya komponen Button shadcn
import { TStaffForHome } from '../_lib/home.type';

const OrganizationSection = ({ allStaff }: { allStaff: TStaffForHome[] }) => {
  return (
    <section className="py-16 bg-muted/30 border-y border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 space-y-10">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider mb-2">
              PEMERINTAHAN DESA
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              Struktur Organisasi
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Mengenal lebih dekat perangkat desa yang siap melayani masyarakat
              Desa Torino dengan sepenuh hati.
            </p>
          </div>

          <div className="hidden md:block">
            <Button variant="outline" asChild className="group">
              <Link href="/pemerintahan/sotk">
                Lihat Struktur Lengkap
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* --- Swiper Slider --- */}
        <div className="relative">
          {/* Gradient Fade di Kiri & Kanan agar terlihat menyatu dengan background */}
          <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-linear-to-r from-background/80 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-linear-to-l from-background/80 to-transparent pointer-events-none" />

          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={24} // Jarak antar slide
            loop={true}
            speed={4000} // Kecepatan gerak (makin besar makin pelan)
            autoplay={{
              delay: 0, // 0 delay agar jalan terus (marquee effect)
              disableOnInteraction: false,
              pauseOnMouseEnter: true, // Berhenti saat di-hover user
            }}
            freeMode={true} // Agar gerakannya linear mulus
            breakpoints={{
              320: { slidesPerView: 1.5, spaceBetween: 16 }, // HP Kecil
              640: { slidesPerView: 2.5, spaceBetween: 20 }, // HP Besar
              768: { slidesPerView: 3.5, spaceBetween: 24 }, // Tablet
              1024: { slidesPerView: 4.5, spaceBetween: 24 }, // Laptop
              1280: { slidesPerView: 5.5, spaceBetween: 24 }, // Desktop Besar
            }}
            className="py-4 pb-8!" // Padding extra untuk bayangan
          >
            {allStaff.map((staff) => (
              <SwiperSlide key={staff.id} className="h-auto">
                <ProfileCard staff={staff} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* --- Button Mobile Only --- */}
        <div className="flex md:hidden justify-center mt-4">
          <Button variant="outline" asChild className="w-full">
            <Link href="#">Lihat Semua Perangkat</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OrganizationSection;

// --- Komponen Kartu Profil ---
const ProfileCard = ({ staff }: { staff: TStaffForHome }) => {
  return (
    <div className="group h-full relative overflow-hidden rounded-2xl bg-card border border-border/60 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
      {/* Container Gambar */}
      <div className="aspect-3/4 w-full overflow-hidden bg-muted relative">
        {staff.imageUrl ? (
          <ImageWrapper
            src={staff.imageUrl as string}
            alt={`Foto profil ${staff.name}`}
            objectFit="cover"
            className="w-full h-full transition-transform duration-700 group-hover:scale-110 sm:grayscale group-hover:grayscale-0"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-muted text-muted-foreground">
            <User size={48} className="mb-2 opacity-50" />
            <span className="text-xs">No Photo</span>
          </div>
        )}

        {/* Overlay Gradient (Bawah) */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      </div>

      {/* Info Content */}
      <div className="p-4 relative">
        {/* Garis Aksen Dekoratif */}
        <div className="absolute top-0 left-4 right-4 h-0.5 bg-primary/20 group-hover:bg-primary transition-colors" />

        <h3 className="font-bold text-base md:text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors mt-2">
          {staff.name}
        </h3>
        <p className="text-sm text-muted-foreground font-medium line-clamp-1">
          {staff.positionType.name}
        </p>
      </div>

      {/* Social / Contact Overlay (Optional - Muncul saat hover) */}
      {/* Kamu bisa menambahkan ikon WA/Telp disini nanti jika data tersedia */}
    </div>
  );
};
