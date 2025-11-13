'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { VillageConfigType } from '../_lib/villageConfig.type';
import {
  villageConfigUpdateSchema,
  villageConfigUpdateValues,
} from '../_lib/villageConfig.zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { updateVillageConfig } from '../_lib/villageConfig.actions';
import { useRouter } from 'next/navigation';

const VillageConfigForm = ({ data }: { data: VillageConfigType }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(villageConfigUpdateSchema),
    defaultValues: data
      ? {
          ...data,
          latitude: data.latitude ? Number(data.latitude) : null,
          longitude: data.longitude ? Number(data.longitude) : null,
        }
      : undefined,
  });

  const onSubmit = async (values: villageConfigUpdateValues) => {
    // console.log('FORM SUBMIT:', values);

    startTransition(async () => {
      const toastId = toast.loading('Menyimpan data desa...');

      try {
        await updateVillageConfig(values);

        toast.success('Data desa berhasil diperbarui', {
          id: toastId, // ✅ replace toast loading dengan success
        });
        router.push('/village');
      } catch (err: any) {
        toast.error(err.message || 'Gagal memperbarui data desa', {
          id: toastId, // ✅ replace toast loading dengan error
        });
      }
    });
  };

  const isValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;
  return (
    <Tabs defaultValue="general" className="">
      <div className="overflow-x-auto whitespace-nowrap flex no-scrollbar pb-3">
        <TabsList className="gap-4 ">
          <TabsTrigger className="hover:cursor-pointer" value="general">
            Umum
          </TabsTrigger>
          <TabsTrigger className="hover:cursor-pointer" value="identity">
            Identitias
          </TabsTrigger>
          <TabsTrigger className="hover:cursor-pointer" value="geo">
            Geografis
          </TabsTrigger>
        </TabsList>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* FORM GENRAL CONTENT */}
          <TabsContent value="general">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="villageCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Id Desa : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: 0123456789"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="villageName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Desa : </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g: Torino" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="districtCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Id Kecamatan : </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g: 810503"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="districtName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Kecamatan : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: Wakate"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="regencyCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Id Kabupaten : </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g: 8105"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="regencyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Kabupaten : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: Seram Bagian Timur"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="provinceCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Id Propinsi : </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g: 81"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="provinceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Kabupaten : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: Maluku"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="officeAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Kantor : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: Jln Soekarno Hatta No.19"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode Post : </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g: 19119"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No Telepon : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: (0911) 123432"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: office@desa.com"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: www.desakami.com"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="establishedYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun Berdiri : </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g: 1945"
                        value={field.value ?? ''} // ✅ ubah null jadi string kosong
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ''
                              ? null
                              : Number(e.target.value),
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          {/* FORM GENRAL CONTENT */}
          <TabsContent value="identity">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="slogan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Slogan : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: Makmur Sejahtera"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vision"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visi : </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Masukan visi desa"
                        {...field}
                        value={field.value ?? ''}
                        className="h-56 sm:h-44 resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Misi : </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Masukan misi desa"
                        {...field}
                        value={field.value ?? ''}
                        className="h-56 sm:h-44 resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi : </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Deskripsikan desamu"
                        {...field}
                        value={field.value ?? ''}
                        className="h-56 sm:h-44 resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          <TabsContent value="geo">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="areaSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Luas Area : </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g: 20.5"
                        {...field}
                        value={field.value ?? ''}
                        // step={0.01}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="areaUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Luas Area : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: km²"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="populationTotal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah Penduduk : </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g: 100000"
                        {...field}
                        value={field.value ?? ''} // ✅ ubah null jadi string kosong
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ''
                              ? null
                              : Number(e.target.value),
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hamletCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah Dusun : </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g: 100"
                        {...field}
                        value={field.value ?? ''} // ✅ ubah null jadi string kosong
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ''
                              ? null
                              : Number(e.target.value),
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rwCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah RW : </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g: 100"
                        {...field}
                        value={field.value ?? ''} // ✅ ubah null jadi string kosong
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ''
                              ? null
                              : Number(e.target.value),
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rtCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah RT: </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g: 100"
                        {...field}
                        value={field.value ?? ''} // ✅ ubah null jadi string kosong
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ''
                              ? null
                              : Number(e.target.value),
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="borderNorth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batas Utara: </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: Desa Utara"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="borderEast"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batas Timur: </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: Desa Timur"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="borderSouth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batas Selatan: </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: Desa Selatan"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="borderWest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batas Barat: </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: Desa Barat"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="elevation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ketinggian : </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g: 1235"
                        value={field.value ?? ''} // ✅ ubah null jadi string kosong
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ''
                              ? null
                              : Number(e.target.value),
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g: 1.23456 or -1.23456"
                        {...field}
                        value={field.value ?? ''} // penting!
                        onChange={(e) => {
                          const val = e.target.value;

                          // Jika kosong → null
                          if (val === '' || val === null) {
                            field.onChange(null);
                          } else {
                            // Jika tidak kosong → number
                            field.onChange(Number(val));
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g: 1.23456 or -1.23456"
                        {...field}
                        value={field.value ?? ''} // penting!
                        onChange={(e) => {
                          const val = e.target.value;

                          // Jika kosong → null
                          if (val === '' || val === null) {
                            field.onChange(null);
                          } else {
                            // Jika tidak kosong → number
                            field.onChange(Number(val));
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          <div className="flex gap-4 items-center justify-end mt-4">
            <Button
              type="submit"
              className="w-fit"
              disabled={!isValid || isSubmitting || isPending}
            >
              {form.formState.isSubmitting || isPending
                ? 'Processing...'
                : 'Simpan'}
            </Button>
          </div>
        </form>
      </Form>
    </Tabs>
  );
};

export default VillageConfigForm;
