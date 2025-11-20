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

type StaffPositionTypeFormProps = {
  initialData?: Partial<{
    id: number;
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

  const onSubmit = (
    data: StaffPositionTypeCreateInput | StaffPositionTypeUpdateInput,
  ) => {
    console.log(data);

    if (isUpdate) {
    } else {
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
              <FormControl>
                <Input {...field} placeholder="Masukkan nama posisi" />
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
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ''}
                  placeholder="Deskripsi posisi (opsional)"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{isUpdate ? 'Update' : 'Simpan'}</Button>
      </form>
    </Form>
  );
}
