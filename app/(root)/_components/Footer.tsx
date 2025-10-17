import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  Pin,
  Timer,
  Twitter,
  X,
  Youtube,
} from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <header className="bg-amber-800 sticky z-50 top-0">
      <div className="container mx-auto flex items-center justify-between p-4  text-white">
        <div>
          <div className="flex items-center gap-2 ">
            <Image
              className="bg-white rounded-full"
              src={'/img/logo-desa.png'}
              alt="Logo Desa Torino"
              width={35}
              height={35}
            />
            <div>
              <h1 className="font-semibold text-base">Desa Torino</h1>
              <p className="text-slate-300 ">Kabupaten Italia Timur</p>
            </div>
          </div>
        </div>
        <div className="space-y-4 md:flex gap-6">
          <div className="space-y-2">
            <div>Kontak</div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Phone size={16} /> 0812345678
              </div>
              <div className="flex items-center gap-1">
                <Mail size={16} /> desatorino@email.com
              </div>
              <div className="flex items-center gap-1">
                <Timer size={16} /> Senin-Kamis (08.00 - 15 00), Jumat (08.00 -
                11.00)
              </div>
              <div className="flex items-center gap-1">
                <Pin size={16} /> Jalan Torino Italia Timur
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div>Sosmed</div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Facebook size={16} /> desatorino
              </div>
              <div className="flex items-center gap-1">
                <Youtube size={16} /> desatorino
              </div>
              <div className="flex items-center gap-1">
                <Instagram size={16} /> desatorino
              </div>
              <div className="flex items-center gap-1">
                <Twitter size={16} /> desatorino
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    // <footer className="bg-amber-800 text-white p-4 text-sm space-y-6 md:flex gap-8 justify-between">
    //   <div>
    //     <div className="flex items-center gap-2 ">
    //       <Image
    //         className="bg-white rounded-full"
    //         src={'/img/logo-desa.png'}
    //         alt="Logo Desa Torino"
    //         width={35}
    //         height={35}
    //       />
    //       <div>
    //         <h1 className="font-semibold text-base">Desa Torino</h1>
    //         <p className="text-slate-300 ">Kabupaten Italia Timur</p>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="space-y-4 md:flex gap-6">
    //     <div className="space-y-2">
    //       <div>Kontak</div>
    //       <div className="space-y-1">
    //         <div className="flex items-center gap-1">
    //           <Phone size={16} /> 0812345678
    //         </div>
    //         <div className="flex items-center gap-1">
    //           <Mail size={16} /> desatorino@email.com
    //         </div>
    //         <div className="flex items-center gap-1">
    //           <Timer size={16} /> Senin-Kamis (08.00 - 15 00), Jumat (08.00 -
    //           11.00)
    //         </div>
    //         <div className="flex items-center gap-1">
    //           <Pin size={16} /> Jalan Torino Italia Timur
    //         </div>
    //       </div>
    //     </div>
    //     <div className="space-y-2">
    //       <div>Sosmed</div>
    //       <div className="space-y-1">
    //         <div className="flex items-center gap-1">
    //           <Facebook size={16} /> desatorino
    //         </div>
    //         <div className="flex items-center gap-1">
    //           <Youtube size={16} /> desatorino
    //         </div>
    //         <div className="flex items-center gap-1">
    //           <Instagram size={16} /> desatorino
    //         </div>
    //         <div className="flex items-center gap-1">
    //           <Twitter size={16} /> desatorino
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
  );
};

export default Footer;
