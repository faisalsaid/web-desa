'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Pastikan punya komponen button Shadcn

// --- Variabel Animasi ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const MapLocationSection = () => {
  return (
    <section className="py-12 md:py-20 bg-background border-t border-border">
      <motion.div
        className="container mx-auto px-4 md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Peta Lokasi Desa
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Temukan lokasi strategis desa kami. Silakan berkunjung untuk
              menikmati keindahan alam dan keramahan warga.
            </p>
          </div>

          <Button variant="outline" className="hidden md:flex gap-2">
            <MapPin className="w-4 h-4" />
            Lihat di Google Maps
          </Button>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg border border-border/50 group">
          {/* Iframe Peta */}
          {/* 
            Tip: Class 'dark:grayscale dark:invert md:dark:invert-0' adalah trik 
            untuk membuat peta Google Maps tidak terlalu silau di mode gelap.
            Atau cukup gunakan 'dark:brightness-[0.7]' agar lebih redup.
          */}
          <iframe
            className="w-full h-full transition-all duration-500 dark:brightness-[0.85] dark:contrast-[1.1]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d129382.4102786677!2d7.505275637331552!3d45.07026297256929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886d126418be25%3A0x8903f803d69c77bf!2sTurin%2C%20Metropolitan%20City%20of%20Turin%2C%20Italy!5e1!3m2!1sen!2sid!4v1754777102482!5m2!1sen!2sid"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Peta Lokasi Desa"
          ></iframe>

          {/* Floating Info Card (Pojok Kiri Atas) */}
          <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-card/90 backdrop-blur-md border border-border p-5 rounded-xl shadow-xl max-w-[280px] md:max-w-sm transform transition-all duration-300 hover:scale-105">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary mt-1">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">
                  Kantor Desa Sukamaju
                </h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Jl. Raya Utama No. 123, Kecamatan Lembang, Kabupaten Bandung
                  Barat, 40391
                </p>
                <div className="mt-4">
                  <Button
                    size="sm"
                    className="w-full gap-2 bg-primary hover:bg-primary/90"
                  >
                    <Navigation className="w-3 h-3" />
                    Petunjuk Arah
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay Gradient (Hiasan Bawah) */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-black/20 to-transparent pointer-events-none md:hidden" />
        </div>

        {/* Tombol Mobile (Muncul di bawah peta hanya di HP) */}
        <div className="mt-4 md:hidden">
          <Button className="w-full" variant="outline">
            Buka di Google Maps
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default MapLocationSection;
