'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useState } from 'react';

const listAduan = [
  { key: 'umum', value: 'Umum' },
  { key: 'sosial', value: 'Sosial' },
  { key: 'keamanan', value: 'Keamanan' },
  { key: 'kesehatan', value: 'Kesehatan' },
  { key: 'kebersihan', value: 'Kebersihan' },
  { key: 'permintaan', value: 'Permitaan' },
];

const FormPengaduan = () => {
  const [fileName, setFileName] = useState('');
  return (
    <div className="space-y-6">
      <h1 className="text-center text-amber-800 text-xl font-semibold">
        FORM PENGADUAN
      </h1>
      <form className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Nama</Label>
          <Input type="text" id="name" placeholder="Masukan nama anda" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="phone">No. Telepon / WA</Label>
          <Input type="phone" id="phone" placeholder="Masukan No. Telp / WA" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="category">Kategori Pengaduan</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih kategori pengaduan" />
            </SelectTrigger>
            <SelectContent>
              {listAduan.map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  {item.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="aduan">Isi aduan</Label>
          <Textarea
            placeholder="Masukan detail aduan anda."
            id="aduan"
            className="min-h-28"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="attachment">Lampiran</Label>
          <div className="relative">
            <Input
              type="file"
              id="attachment"
              className="opacity-0 absolute inset-0 cursor-pointer z-10"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
            />
            <div className="border rounded-md px-3 py-2 text-sm text-muted-foreground h-10 flex items-center">
              {fileName || 'Pilih file unggahan foto/PDF'}
            </div>
          </div>
        </div>

        <Button className="w-full">
          <Send /> Kirim
        </Button>
      </form>
    </div>
  );
};

export default FormPengaduan;
