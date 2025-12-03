'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Send, User, Phone, UploadCloud, CheckCircle2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// 1. Schema Validasi
const formSchema = z.object({
  name: z.string().min(2, { message: 'Nama harus diisi minimal 2 karakter.' }),
  phone: z
    .string()
    .min(10, { message: 'Nomor telepon minimal 10 digit.' })
    .regex(/^[0-9]+$/, 'Hanya boleh angka.'),
  category: z.string({ error: 'Silakan pilih kategori pengaduan.' }),
  aduan: z
    .string()
    .min(10, { message: 'Mohon jelaskan aduan minimal 10 karakter.' }),
  attachment: z.any().optional(),
});

const listAduan = [
  { key: 'umum', value: 'Umum' },
  { key: 'sosial', value: 'Sosial' },
  { key: 'keamanan', value: 'Keamanan' },
  { key: 'kesehatan', value: 'Kesehatan' },
  { key: 'kebersihan', value: 'Kebersihan' },
  { key: 'permintaan', value: 'Permintaan Layanan' },
];

const FormPengaduan = () => {
  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      category: '',
      aduan: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Values:', values);
    alert('Pengaduan dikirim!');
    // Integrasi API disini nanti
  }

  // Animasi Masuk
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-xl mx-auto p-4"
    >
      {/* Card dengan Glass Effect & Dark Mode */}
      <Card className="border-t-4 border-zinc-200 border-t-emerald-600  shadow-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md  dark:border-zinc-800">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
            Formulir Pengaduan
          </CardTitle>
          <CardDescription className="text-zinc-500 dark:text-zinc-400">
            Sampaikan aspirasi Anda untuk kemajuan desa kita.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Nama Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700 dark:text-zinc-300">
                      Nama Lengkap
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                        <Input
                          placeholder="Masukan nama lengkap"
                          className="pl-9 bg-zinc-50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              {/* Phone Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700 dark:text-zinc-300">
                      No. Telepon / WA
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                        <Input
                          placeholder="08xxxxxxxxxx"
                          type="tel"
                          className="pl-9 bg-zinc-50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              {/* Category Select */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700 dark:text-zinc-300">
                      Kategori Pengaduan
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger className="bg-zinc-50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 focus:ring-emerald-500">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark:bg-zinc-900 dark:border-zinc-800">
                        {listAduan.map((item) => (
                          <SelectItem
                            key={item.key}
                            value={item.key}
                            className="focus:bg-emerald-50 dark:focus:bg-emerald-900/20 cursor-pointer"
                          >
                            {item.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              {/* Aduan Textarea */}
              <FormField
                control={form.control}
                name="aduan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700 dark:text-zinc-300">
                      Isi Aduan
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ceritakan detail permasalahan..."
                        className="min-h-[120px] bg-zinc-50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-right text-zinc-400">
                      Min. 10 Karakter
                    </FormDescription>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              {/* Upload Area Custom */}
              <div className="space-y-2">
                <FormLabel className="text-zinc-700 dark:text-zinc-300">
                  Lampiran Bukti (Opsional)
                </FormLabel>

                <div
                  className={`
                  relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300
                  ${
                    fileName
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10'
                      : 'border-zinc-300 dark:border-zinc-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                  }
                `}
                >
                  <Input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFileName(file.name);
                        form.setValue('attachment', file);
                      }
                    }}
                    accept="image/*,.pdf"
                  />

                  <div className="flex flex-col items-center justify-center space-y-2">
                    {fileName ? (
                      <>
                        <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400 animate-bounce" />
                        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300 line-clamp-1">
                          {fileName}
                        </span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="h-8 w-8 text-zinc-400 mb-1 group-hover:text-emerald-500" />
                        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                          Klik untuk unggah foto/dokumen
                        </span>
                        <span className="text-xs text-zinc-400">
                          JPG, PNG, PDF (Max 5MB)
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Tombol Hapus Lampiran */}
                {fileName && (
                  <div
                    onClick={() => {
                      setFileName(null);
                      form.setValue('attachment', null);
                    }}
                    className="text-xs text-red-500 cursor-pointer flex items-center justify-end gap-1 hover:underline"
                  >
                    <X className="w-3 h-3" /> Hapus file
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-6 shadow-lg shadow-emerald-500/20 dark:shadow-emerald-900/20 transition-all duration-300 hover:scale-[1.01]"
              >
                <Send className="w-5 h-5 mr-2" />
                Kirim Laporan
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FormPengaduan;
