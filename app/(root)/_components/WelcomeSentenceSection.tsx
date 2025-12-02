'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useVillageStore } from '@/store/villageStore';
import ImageWrapper from '@/components/ImageWraper';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

// --- Variabel Animasi ---
const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: 0.2 },
  },
};

const WelcomeSentenceSection = () => {
  const village = useVillageStore((state) => state.village);
  const headOfVillage = useVillageStore((state) => state.headOfVillage);

  // Fallback data agar tidak error/jelek saat loading
  const villageName = village?.villageName || 'Nama Desa';
  const kadesName = headOfVillage?.name || 'Nama Kepala Desa';
  const kadesImage = headOfVillage?.imageUrl; // Jika null, ImageWrapper harus handle fallback

  return (
    <section className="py-12 md:py-20 overflow-hidden">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* --- KOLOM KIRI: FOTO KADES --- */}
          <motion.div
            className="md:col-span-5 flex flex-col items-center md:items-start relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
          >
            {/* Dekorasi Background Blob/Kotak */}
            <div className="absolute top-4 left-4 w-full h-full bg-primary/10 rounded-3xl -z-10 translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4" />

            {/* Container Foto */}
            <div className="relative w-full max-w-sm aspect-3/4 rounded-2xl overflow-hidden shadow-xl border border-border bg-muted">
              <ImageWrapper
                src={kadesImage as string}
                alt={`Kepala Desa ${villageName}`}
                objectFit="cover"
                // Pastikan ImageWrapper kamu support className width/height full
                className="w-full h-full transition-transform duration-700 hover:scale-105"
              />

              {/* Overlay Nama di Bawah Foto (Mobile Only - Optional) */}
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4 md:hidden">
                <p className="text-white font-bold text-lg">{kadesName}</p>
                <p className="text-white/80 text-xs">
                  Kepala Desa {villageName}
                </p>
              </div>
            </div>

            {/* Kotak Nama (Desktop Only - Gaya Kartu Mengambang) */}
            <div className="hidden md:flex absolute -bottom-6 -right-6 bg-card border border-border p-4 rounded-xl shadow-lg items-center gap-3 max-w-[280px]">
              <div className="h-10 w-1 bg-primary rounded-full"></div>
              <div>
                <p className="font-bold text-lg text-card-foreground leading-tight">
                  {kadesName}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Kepala Desa
                </p>
              </div>
            </div>
          </motion.div>

          {/* --- KOLOM KANAN: SAMBUTAN --- */}
          <motion.div
            className="md:col-span-7 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
          >
            {/* Header Title */}
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                <Quote className="w-4 h-4" />
                <span>Sambutan Pemimpin</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Membangun <span className="text-primary">{villageName}</span>{' '}
                <br />
                yang Lebih Maju
              </h2>
            </div>

            {/* Content Area dengan Scroll */}
            <div className="relative p-6 rounded-2xl bg-card border border-border shadow-sm">
              {/* Ikon Kutipan Besar Transparan */}
              <Quote className="absolute top-4 right-4 text-muted/20 w-16 h-16 rotate-180 pointer-events-none" />

              <ScrollArea className="h-64 pr-4">
                <div className="text-muted-foreground text-base leading-relaxed space-y-4 text-justify">
                  <p>Assalamu’alaikum Warahmatullahi Wabarakatuh,</p>
                  <p>
                    Selamat datang di Website Resmi Desa{' '}
                    <strong>{villageName}</strong>. Sebagai desa yang kaya akan
                    potensi dan budaya, kami berkomitmen menghadirkan layanan
                    informasi yang transparan, cepat, dan mudah diakses oleh
                    seluruh masyarakat.
                  </p>
                  <p>
                    Melalui website ini, kami berharap setiap program
                    pembangunan, kegiatan desa, dan potensi wilayah dapat
                    tersampaikan dengan baik serta mendorong partisipasi aktif
                    warga dalam mewujudkan Desa {villageName} yang maju,
                    sejahtera, dan berdaya saing.
                  </p>
                  <p>
                    Mari kita bersama-sama bersinergi membangun desa tercinta
                    ini. Terima kasih atas kunjungan Anda.
                  </p>
                  <p>Wassalamu’alaikum Warahmatullahi Wabarakatuh.</p>
                </div>
              </ScrollArea>
            </div>

            {/* Signature / Footer Kecil */}
            <div className="pt-2 flex items-center justify-between md:justify-start gap-4 border-t border-border mt-4">
              <div className="text-sm text-muted-foreground italic">
                {`"Terus Melayani dengan Hati"`}
              </div>
              {/* Bisa tambah Tanda Tangan digital disini jika ada gambarnya */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSentenceSection;
