'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormDescription,
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
import {
  createStaffPositionType,
  updateStaffPosition,
} from '../_lib/organitatons.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { StaffPositionType } from '@prisma/client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { positionTypeLabels } from '@/lib/enum';

type StaffPositionTypeFormProps = {
  initialData?: Partial<{
    id: number;
    slug: string;
    name: string;
    description: string | null;
    positionType: StaffPositionType;
  }>;
  // onClick : () => void;
  closeModal: () => void;
};

export default function StaffPositionTypeForm({
  initialData,
  closeModal,
}: //   onSubmit,
StaffPositionTypeFormProps) {
  const router = useRouter();
  const isUpdate = !!initialData;

  const form = useForm({
    resolver: zodResolver(
      isUpdate ? StaffPositionTypeUpdateSchema : StaffPositionTypeCreateSchema,
    ),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      positionType: initialData?.positionType ?? StaffPositionType.OTHER,
      isUnique: false,
    },
  });

  const onSubmit = async (
    payload: StaffPositionTypeCreateInput | StaffPositionTypeUpdateInput,
  ) => {
    console.log('StaffPositionTypeForm => ', payload);

    const toastId = toast.loading(
      isUpdate ? 'Mengubah jabatan...' : 'Membuat jabatan baru...',
    );

    if (isUpdate) {
      const updatePayload = { ...payload, id: initialData.id };
      console.log('StaffPositionTypeForm UPDATE=> ', updatePayload);

      try {
        const res = await updateStaffPosition(initialData.id as number, {
          name: payload.name as string,
          description: payload.description,
          isUnique: payload.isUnique as boolean,
          positionType: payload.positionType as StaffPositionType,
        });

        if (!res.success) {
          toast.error(res.message ?? 'Gagal ubah jabatan.', {
            id: toastId,
          });
          return;
        }
        form.reset();
        closeModal();
        toast.success(res.message, { id: toastId });
      } catch (error) {
        console.log(error);

        toast.error('Terjadi kesalahan server.', { id: toastId });
      } finally {
        router.push('settings');
      }
    } else {
      try {
        const res = await createStaffPositionType(
          payload as StaffPositionTypeCreateInput,
        );

        if (!res.success) {
          toast.error(res.message ?? 'Gagal membuat jabatan baru.', {
            id: toastId,
          });
          return;
        }
        form.reset();
        closeModal();
        toast.success(res.message, { id: toastId });
      } catch (error) {
        console.log(error);

        toast.error('Terjadi kesalahan server.', { id: toastId });
      } finally {
        router.push('settings');
      }
    }
  };

  const nameValue = form.watch('name');
  const nameState = form.getFieldState('name');
  const isNameInvalid = !nameValue || nameState.invalid;

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
          name="positionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Posisi</FormLabel>
              <FormControl className="bg-background">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih tipe posisi" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(positionTypeLabels).map(
                      ([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isUnique"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <FormLabel
                    className={`${
                      isNameInvalid ? 'text-muted-foreground' : ''
                    }`}
                  >
                    Jabatan Tunggal
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-green-500 hover:cursor-pointer"
                      disabled={isNameInvalid}
                    />
                  </FormControl>
                </div>
                <FormDescription>
                  <span className="text-xs text-muted-foreground">
                    Aktifkan jika jabatan ini hanya boleh dipegang oleh satu
                    orang pada satu waktu.
                  </span>
                </FormDescription>
              </div>

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
                  disabled={isNameInvalid}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant={'outline'}
            onClick={closeModal}
            className="text-red-500"
          >
            Cancel
          </Button>

          <Button type="submit">
            <Upload />
            {isUpdate ? 'Ubah' : 'Simpan'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
