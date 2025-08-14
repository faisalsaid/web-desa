import { Separator } from '@/components/ui/separator';
import ProfilCard from './ProfilCard';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const visi = {
  title: 'Visi',
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti harum ab blanditiis nostrum tempora eius exercitationem hic repellendus debitis architecto, illum enim laboriosam, veritatis iste maxime consequuntur doloribus quo facere ex vitae!',
};
const misi = {
  title: 'Misi',
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti harum ab blanditiis nostrum tempora eius exercitationem hic repellendus debitis architecto, illum enim laboriosam, veritatis iste maxime consequuntur doloribus quo facere ex vitae!',
};

const batasDesa = [
  { title: 'Utara', content: 'Desa Cagliari dan Desa Milan' },
  { title: 'Timur', content: 'Selat Bosporus' },
  { title: 'Selatan', content: 'Desa Roma' },
  { title: 'Barat', content: 'Samudra hindia' },
];

const ProfilPage = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ProfilCard title={visi.title} content={visi.content} />
        <ProfilCard title={misi.title} content={misi.content} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ProfilCard title={'Bagan Desa'} content={'Tidak ada data'} />
        <ProfilCard title={'Sejarah Desa'} content={'Tidak ada data'} />
      </div>
      <div className="p-4 bg-muted rounded-xl space-y-5">
        <h1 className="text-amber-600 text-lg font-semibold text-center">
          Peta Lokasi
        </h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <iframe
            className="w-full h-44 md:h-96 lg:h-[400px] rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d129382.4102786677!2d7.505275637331552!3d45.07026297256929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886d126418be25%3A0x8903f803d69c77bf!2sTurin%2C%20Metropolitan%20City%20of%20Turin%2C%20Italy!5e1!3m2!1sen!2sid!4v1754777102482!5m2!1sen!2sid"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
          <div className="bg-background p-4 rounded-lg space-y-2">
            <div className="space-y-2">
              <p>Batas Desa :</p>
              <div className="grid grid-cols-2 gap-4 text-sm ">
                {batasDesa.map((item) => (
                  <div key={item.title}>
                    <div>{item.title}</div>
                    <p className="text-muted-foreground">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-2">
              <div>Luas Desa</div>
              <div>1.234.456 m</div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-2">
              <div>Jumlah Penduduk</div>
              <div>345.345 Jiwa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilPage;
