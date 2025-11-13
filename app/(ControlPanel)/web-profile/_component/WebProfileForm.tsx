'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import {
  VillageProfileFormValues,
  villageProfileSchema,
} from '../_lib/villageProvile.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { VillageProfileType } from '../_lib/vilageProvile.type';

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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { updateVillageProfile } from '../_lib/vilageProvile.action';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

function sanitizePayload(values: VillageProfileFormValues) {
  return {
    ...values,
    logo: values.logo ?? null,
    description: values.description ?? null,
    vision: values.vision ?? null,
    mission: values.mission ?? null,
    country: values.country ?? null,
    province: values.province ?? null,
    regency: values.regency ?? null,
    district: values.district ?? null,
    village: values.village ?? null,
    northBorder: values.northBorder ?? null,
    eastBorder: values.eastBorder ?? null,
    southBorder: values.southBorder ?? null,
    westBorder: values.westBorder ?? null,
    mapUrl: values.mapUrl ?? null,

    // numeric fields
    latitude: values.latitude ?? null,
    longitude: values.longitude ?? null,
    areaKm2: values.areaKm2 ?? null,
    elevation: values.elevation ?? null,
    population: values.population ?? null,
  };
}

const WebProfileForm = ({ data }: { data: VillageProfileType }) => {
  const form = useForm<VillageProfileFormValues>({
    resolver: zodResolver(villageProfileSchema),
    defaultValues: data,
  });

  const onSubmit = async (values: VillageProfileFormValues) => {
    // console.log('FORM SUBMIT:', values);

    const payload = sanitizePayload(values);
    const id = toast.loading('Update Village Profile...');
    const res = await updateVillageProfile(payload);

    toast.dismiss(id);

    if (res.ok) {
      toast.success('Data desa berhasil diperbahaui.');
      redirect('/web-profile');
    } else {
      toast.error('Gagal perbahurui profil desa!');
      return;
    }
  };

  const isValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;
  return (
    <Tabs defaultValue="general" className="">
      <div className="overflow-x-auto whitespace-nowrap flex no-scrollbar pb-3">
        <TabsList className="gap-4 ">
          <TabsTrigger className="hover:cursor-pointer" value="general">
            General
          </TabsTrigger>
          <TabsTrigger className="hover:cursor-pointer" value="vision-mision">
            Visi Misi
          </TabsTrigger>
          <TabsTrigger className="hover:cursor-pointer" value="location">
            Lokasi
          </TabsTrigger>
          <TabsTrigger className="hover:cursor-pointer" value="geo">
            Geografi
          </TabsTrigger>
          <TabsTrigger className="hover:cursor-pointer" value="border">
            Batas Wilayah
          </TabsTrigger>
          <TabsTrigger className="hover:cursor-pointer" value="map">
            Peta Lokasi
          </TabsTrigger>
        </TabsList>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TabsContent value="general">
            <div className="space-y-4 ">
              <FormField
                control={form.control}
                name="name"
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
                name="tagline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tagline : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: Mandiri dan berdikari"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi : </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Masukan deskripsi desa"
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
          <TabsContent value="vision-mision">
            <div className="space-y-4">
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
            </div>
          </TabsContent>
          <TabsContent value="location">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Propinsi : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: Torino"
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
                name="regency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kabupaten : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: Torino"
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
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kabupaten : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: Torino"
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
                name="village"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Propinsi : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: Torino"
                        {...field}
                        value={field.value ?? ''}
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
                    <FormLabel>Longtitude :</FormLabel>
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
                name="areaKm2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Luas Wilayah</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g: 100000"
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
                name="elevation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ketinggian</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g: 75"
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
          <TabsContent value="border">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="northBorder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Utara : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: Desa Milan"
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
                name="eastBorder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timur : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: Desa Roma"
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
                name="southBorder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selatan : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: Laut Antartika"
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
                name="westBorder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Barat : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g: Laut"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          <TabsContent value="map">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="mapUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Map : </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukan link map"
                        {...field}
                        value={field.value ?? ''}
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
              disabled={!isValid || isSubmitting}
            >
              {form.formState.isSubmitting ? 'Processing...' : 'Simpan'}
            </Button>
          </div>
        </form>
      </Form>
    </Tabs>
  );
};

export default WebProfileForm;
