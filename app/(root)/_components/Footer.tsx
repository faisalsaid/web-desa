'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useVillageStore } from '@/store/villageStore';
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Clock,
  Twitter,
  Youtube,
  Globe,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button'; // Optional: Jika pakai Shadcn Button

const Footer = () => {
  const { village, headOfVillage } = useVillageStore((state) => state);

  // Fallback data jika store belum siap/kosong
  const data = {
    name: village?.villageName || 'Desa Torino',
    regency: village?.regencyName || 'Kabupaten Torino',
    address:
      village?.officeAddress || 'Jalan Raya Utama No. 1, Kecamatan Torino',
    phone: village?.phone || '+62 812-3456-7890',
    email: village?.email || 'admin@desatorino.go.id',
    desc: 'Mewujudkan pelayanan publik yang transparan, akuntabel, dan partisipatif menuju desa mandiri dan sejahtera.',
  };

  return (
    <footer className="relative bg-slate-900 text-slate-200 mt-20">
      {/* --- Hiasan Gelombang (Wave SVG) di Atas --- */}
      {/* <div className="absolute top-0 left-0 right-0 -translate-y-[99%] w-full overflow-hidden leading-0">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-muted"
          ></path>
        </svg>
      </div> */}
      <div className="container mx-auto px-4 md:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* --- KOLOM 1: IDENTITAS DESA (4 Kolom) --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm border border-white/10">
                {/* Ganti src dengan logo asli */}
                <Image
                  src="/img/logo-desa.png"
                  alt="Logo Desa"
                  width={48}
                  height={48}
                  className="object-contain"
                  // Fallback visual jika logo 404
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add(
                      'w-12',
                      'h-12',
                      'bg-green-600',
                    );
                  }}
                />
              </div>
              <div>
                <h3 className="font-bold text-xl text-white leading-none">
                  {data.name}
                </h3>
                <p className="text-sm text-emerald-400 font-medium mt-1">
                  {data.regency}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              {data.desc}
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-3 pt-2">
              <SocialButton icon={Facebook} href="#" label="Facebook" />
              <SocialButton icon={Instagram} href="#" label="Instagram" />
              <SocialButton icon={Twitter} href="#" label="Twitter" />
              <SocialButton icon={Youtube} href="#" label="Youtube" />
            </div>
          </div>

          {/* --- KOLOM 2: JELAJAHI (Menu) (2 Kolom) --- */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-bold text-white text-lg relative inline-block">
              Jelajahi
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-emerald-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Profil Desa', link: '/profil' },
                { name: 'Layanan Publik', link: '/layanan' },
                { name: 'Berita Terkini', link: '/berita' },
                { name: 'Potensi Desa', link: '/potensi' },
                { name: 'Transparansi', link: '/transparansi' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- KOLOM 3: KONTAK (3 Kolom) --- */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bold text-white text-lg relative inline-block">
              Hubungi Kami
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-emerald-500 rounded-full"></span>
            </h4>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                <span className="leading-relaxed">{data.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>{data.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>{data.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <p>Senin - Kamis: 08.00 - 15.00</p>
                  <p>Jumat: 08.00 - 11.00</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- KOLOM 4: PETA / EXTRA (3 Kolom) --- */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bold text-white text-lg relative inline-block">
              Lokasi Kantor
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-emerald-500 rounded-full"></span>
            </h4>
            {/* Simple Map Placeholder or Widget */}
            <div className="w-full h-40 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden relative group cursor-pointer">
              {/* Ganti gambar ini dengan screenshot peta desa */}
              <div className="absolute inset-0 bg-slate-700 flex items-center justify-center group-hover:bg-slate-600 transition-colors">
                <MapPin className="w-8 h-8 text-slate-500" />
                <span className="ml-2 text-slate-400 font-medium">
                  Buka Peta
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Kunjungi kantor kami untuk layanan tatap muka.
            </p>
          </div>
        </div>

        {/* --- COPYRIGHT SECTION --- */}
        <div className="mt-16 pt-8 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Pemerintah {data.name}. Hak Cipta
            Dilindungi.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-emerald-400 transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="#" className="hover:text-emerald-400 transition-colors">
              Syarat & Ketentuan
            </Link>
            <Link href="#" className="hover:text-emerald-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// --- Helper Component: Social Button ---
const SocialButton = ({
  icon: Icon,
  href,
  label,
}: {
  icon: any;
  href: string;
  label: string;
}) => {
  return (
    <Link
      href={href}
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-emerald-600 hover:text-white transition-all duration-300 border border-slate-700 hover:border-emerald-500"
    >
      <Icon size={18} />
    </Link>
  );
};
