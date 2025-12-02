import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';

export function HeroComp() {
  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image dengan Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/hero-desa.jpeg" // Ganti dengan foto pemandangan desa resolusi tinggi
          alt="Pemandangan Desa"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay agar teks terbaca */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-background/90" />
      </div>

      {/* Konten */}
      <div className="relative z-10 container px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>Surga Tersembunyi di Bandung Barat</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg max-w-4xl mx-auto">
          Membangun Desa, <br className="hidden md:block" />
          <span className="text-emerald-400">Melestarikan Budaya</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Selamat datang di website resmi Desa Sukamaju. Pusat informasi layanan
          publik, transparansi anggaran, dan potensi wisata lokal.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white h-12 px-8 text-base"
          >
            Jelajahi Potensi
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-black h-12 px-8 text-base transition-all"
          >
            Layanan Warga <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
