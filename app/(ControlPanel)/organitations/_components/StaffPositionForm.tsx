'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  StaffPositionTypeCreateInput,
  StaffPositionTypeCreateSchema,
  StaffPositionTypeUpdateInput,
  StaffPositionTypeUpdateSchema,
} from '../_lib/organitaions.zod';
import { Upload } from 'lucide-react';
import { createStaffPositionType } from '../_lib/organitatons.action';
import { toast } from 'sonner';

type StaffPositionTypeFormProps = {
  initialData?: Partial<{
    id: number;
    slug: string;
    name: string;
    description: string | null;
  }>;
};

export default function StaffPositionTypeForm({
  initialData,
}: //   onSubmit,
StaffPositionTypeFormProps) {
  const isUpdate = !!initialData;

  const form = useForm({
    resolver: zodResolver(
      isUpdate ? StaffPositionTypeUpdateSchema : StaffPositionTypeCreateSchema,
    ),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
    },
  });

  const onSubmit = async (
    data: StaffPositionTypeCreateInput | StaffPositionTypeUpdateInput,
  ) => {
    console.log(data);

    const toastId = toast.loading(
      isUpdate ? 'Mengubah jabatan...' : 'Membuat jabatan baru...',
    );

    if (isUpdate) {
    } else {
      try {
        const res = await createStaffPositionType(
          data as StaffPositionTypeCreateInput,
        );

        if (!res.success) {
          toast.error(res.message ?? 'Gagal mebuat jabatan baru.', {
            id: toastId,
          });
          return;
        }
        form.reset();
        toast.success(res.message, { id: toastId });
      } catch (error) {
        console.log(error);

        toast.error('Terjadi kesalahan server.', { id: toastId });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Posisi</FormLabel>
              <FormControl className="bg-background">
                <Input {...field} placeholder="e.g : Kepala Desa" />
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
              <FormLabel>Deskripsi</FormLabel>
              <FormControl className="bg-background">
                <Textarea
                  {...field}
                  value={field.value ?? ''}
                  placeholder="e.g : Bertanggung jawab semua ursan terkait desa"
                  className="h-28 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          <Upload />
          {isUpdate ? 'Ubah' : 'Simpan'}
        </Button>
      </form>
    </Form>
  );
}
