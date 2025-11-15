'use client';

import { useState } from 'react';
// import { createFamily } from './actions';
// import { FamilyCreateInput, FamilyCreateSchema } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner'; // opsional, untuk feedback

// Shadcn UI Components
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FamilyCreateInput, FamilyCreateSchema } from '../_lib/families.zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DUSUN_LIST, RT_LIST, RW_LIST } from '@/lib/staticData';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';

export function CreateFamilyForm() {
  //   const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FamilyCreateInput>({
    resolver: zodResolver(FamilyCreateSchema),
    defaultValues: {
      familyCardNumber: '',
      address: '',
      dusun: '',
      rw: '',
      rt: '',
      headOfFamilyId: undefined,
    },
    mode: 'onChange',
  });

  async function onSubmit(values: FamilyCreateInput) {
    console.log(values);

    // setIsSubmitting(true);
    // try {
    //   const result = await createFamil(values);
    //   if (result.success) {
    //     toast.success('Family berhasil dibuat!');
    //     form.reset();
    //   } else {
    //     toast.error(result.error || 'Gagal membuat family.');
    //   }
    // } catch (err) {
    //   console.error(err);
    //   toast.error('Terjadi kesalahan saat submit.');
    // } finally {
    //   setIsSubmitting(false);
    // }
  }

  const disabled = form.formState.isSubmitted && !form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="familyCardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nomor KK : <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g : 3171011503950001"
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Alamat : <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="e.g : Jl. Panglima Sudirman No. 1"
                  className="resize-none h-32" // mencegah resize
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="dusun"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Dusun : <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih dusun" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {DUSUN_LIST.map((dusun) => (
                      <SelectItem key={dusun.key} value={dusun.key}>
                        {dusun.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* // RW */}
          <FormField
            control={form.control}
            name="rw"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  RW : <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih RW" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {RW_LIST.map((rw) => (
                      <SelectItem key={rw.key} value={rw.key}>
                        {rw.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* // RT */}
          <FormField
            control={form.control}
            name="rt"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  RT : <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih RT" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {RT_LIST.map((rt) => (
                      <SelectItem key={rt.key} value={rt.key}>
                        {rt.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="headOfFamilyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Kepala Keluarga (Opsional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Masukkan ID resident"
                  type="number"
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="submit"
            className="w-fit"
            disabled={disabled || isSubmitting}
          >
            <Upload />
            {form.formState.isSubmitting ? 'Menyimpan...' : 'Buat Family'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
