'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CreateStaffInput,
  createStaffSchema,
  UpdateStaffInput,
  updateStaffSchema,
} from '../_lib/organitaions.zod';
import { Autocomplete } from '@/components/autocomplete';
import {
  createStaff,
  searchResidentToStaff,
} from '../_lib/organitatons.action';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar, RefreshCwIcon, Upload } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type PositionOption = {
  id: number;
  name: string;
  isUnique: boolean;
  isFilled: boolean;
};
// type UnitOption = { id: number; name: string };

type ResidentItem = { id: number; fullName: string; nik: string };

type StaffFormProps = {
  mode: 'create' | 'update';
  defaultValues?: Partial<UpdateStaffInput>;
  positions: PositionOption[];
  //   units: UnitOption[];
};

export function StaffForm({
  mode,
  defaultValues,
  // residents,
  positions,
}: StaffFormProps) {
  const router = useRouter();

  const form = useForm<CreateStaffInput | UpdateStaffInput>({
    resolver: zodResolver(
      mode === 'create' ? createStaffSchema : updateStaffSchema,
    ),
    defaultValues: defaultValues ?? {
      isActive: true,
      startDate: new Date(),
      endDate: null,
      //   organizationUnitId: null,
    },
  });

  const availableTypes = positions.filter((t) => !(t.isUnique && t.isFilled));
  const watchResidentId = form.watch('residentId');
  const watchPositionTypeId = form.watch('positionTypeId');

  const [selectedResident, setSelectedResident] = useState<ResidentItem | null>(
    null,
  );
  const [formKey, setFormKey] = useState(0);

  const handleReset = () => {
    form.reset();
    setFormKey((prev) => prev + 1);
    setSelectedResident(null);
  };

  const onSubmit = async (formData: CreateStaffInput | UpdateStaffInput) => {
    console.log('FORM DATA', formData);

    const isEdit = mode === 'update';

    // 1️⃣ Tetapkan pesan
    const loadingMessage = isEdit
      ? 'Perbahurui perangkat...'
      : 'Menyimpan perangkat...';
    const successMessage = isEdit
      ? 'Perangkat berhasil diubah!'
      : 'Perangkat berhasil dibuat!';
    const errorMessage = isEdit
      ? 'Gagal ubah perangkat'
      : 'Gagal membuat perangkat';

    // 2️⃣ Buat toast loading → return toastId
    const toastId = toast.loading(loadingMessage);

    if (isEdit) {
    } else {
      try {
        const res = await createStaff(formData);
        if (!res.success) {
          toast.error(res.message, { id: toastId });
        } else {
          toast.success(res.message, { id: toastId });
        }

        router.refresh();
        // eslint-disable-next-line
      } catch (error) {
        toast.error(errorMessage, { id: toastId });
      } finally {
        handleReset();
      }
    }

    // try {
    //   // 3️⃣ Panggil API sesuai mode
    //   if (isEdit) {
    //     // await updateStaff(formData as UpdateStaffInput);
    //   } else {
    //     const res = await createStaff(formData as CreateStaffInput);
    //     console.log(res);
    //   }

    //   // 4️⃣ Update toast menjadi sukses
    //   toast.success(successMessage, { id: toastId });

    //   handleReset();
    //   router.refresh();

    //   // // optional redirect atau close dialog
    //   // if (onSuccess) onSuccess();
    // } catch (err: any) {
    //   console.error(err);

    //   toast.error(errorMessage, {
    //     id: toastId, // replace loading toast with error
    //   });
    // }
  };

  const isValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;
  const isSubmitted = form.formState.isSubmitted;

  console.log(form.getValues());

  return (
    <Form {...form}>
      <form
        key={formKey}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Position Type */}
        <FormField
          control={form.control}
          name="positionTypeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jabatan</FormLabel>
              <Select
                onValueChange={(v) => field.onChange(Number(v))}
                defaultValue={field.value?.toString()}
              >
                <FormControl className="bg-background w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jabatan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableTypes.map((pos) => (
                    <SelectItem key={pos.id} value={pos.id.toString()}>
                      {pos.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Resident */}
        <FormField
          control={form.control}
          name="residentId"
          render={({ field }) => (
            <Autocomplete<ResidentItem>
              disabled={!watchPositionTypeId}
              label="Resident"
              placeholder={
                !watchPositionTypeId
                  ? 'Pilih jabatan terlebih dahulu'
                  : 'Cari resident...'
              }
              // bentuk data di form = id number
              value={selectedResident} // tidak dipakai karena kita simpan id
              onChange={(resident) => {
                setSelectedResident(resident || null);
                field.onChange(resident?.id ?? null);
              }}
              search={async (q) => {
                return await searchResidentToStaff(q);
              }}
              displayValue={(item) =>
                item ? `${item.fullName} – ${item.nik}` : ''
              }
              getKey={(item) => item.id}
              // renderItem={(item) => (
              //   <div className="flex flex-col">
              //     <span className="font-medium">{item.fullName}</span>
              //     <span className="text-xs text-muted-foreground">
              //       NIK: {item.nik}
              //     </span>
              //   </div>
              // )}
            />
          )}
        />
        {/* Organization Unit */}
        {/* <FormField
          control={form.control}
          name="organizationUnitId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Organisasi (opsional)</FormLabel>
              <Select
                onValueChange={(v) => field.onChange(v ? Number(v) : null)}
                defaultValue={field.value?.toString() ?? ''}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Tidak terhubung ke unit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">Tidak ada unit</SelectItem>
                  {units.map((u) => (
                    <SelectItem key={u.id} value={u.id.toString()}>
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <div className="flex gap-2 items-center w-full">
          {/* Start Date */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tanggal Mulai</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full  justify-start text-left"
                        disabled={!watchResidentId}
                      >
                        {field.value
                          ? field.value.toLocaleDateString('id-ID')
                          : 'Pilih tanggal'}
                        <Calendar className="ml-auto h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={field.value ?? undefined}
                        onSelect={(date) => field.onChange(date)}
                        disabled={(date) => date > new Date()} // contoh: tidak bisa pilih tanggal di masa depan
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tanggal Berakhir</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                        disabled={!watchResidentId}
                      >
                        {field.value
                          ? field.value.toLocaleDateString()
                          : 'Pilih tanggal'}
                        <Calendar className="ml-auto h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={field.value ?? undefined}
                        onSelect={(date) => field.onChange(date)}
                        disabled={(date) => date > new Date()} // contoh: tidak bisa pilih tanggal di masa depan
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Active */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Status Aktif</FormLabel>
                <FormDescription>
                  <span className="text-xs text-muted-foreground">
                    Tentukan apakah staff ini sedang aktif atau tidak.
                  </span>
                </FormDescription>
              </div>

              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-green-500"
                  disabled={!watchResidentId}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            className="text-red-500"
            onClick={() => {
              handleReset();
            }}
          >
            <RefreshCwIcon />
            Reset
          </Button>

          {/* Submit */}
          <Button
            type="submit"
            className=""
            disabled={isSubmitting || (isSubmitted && !isValid)}
          >
            {isSubmitting ? <Spinner /> : <Upload className=" h-4 w-4" />}{' '}
            {mode === 'create' ? 'Tambah Perangkat' : 'Simpan Perubahan'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
