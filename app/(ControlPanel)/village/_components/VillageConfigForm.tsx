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

const VillageConfigForm = ({ data }: { data: VillageConfigType }) => {
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
    console.log('FORM SUBMIT:', values);
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
            Geografi
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
                    <FormLabel>No Telepon : </FormLabel>
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
          <TabsContent value="identity">halo</TabsContent>
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

export default VillageConfigForm;
