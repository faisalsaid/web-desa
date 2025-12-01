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
  updateStaffAction,
} from '../_lib/organitatons.action';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar, Pencil, RefreshCwIcon, Undo2, Upload } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import ImageWrapper from '@/components/ImageWraper';
import { ImageInput } from '@/components/ImageInput';
import { updateStaff } from '../staff/_lib/staff.actions';

type PositionOption = {
  id: number;
  name: string;
  isUnique: boolean;
  isFilled: boolean;
};
// type UnitOption = { id: number; name: string };

type ResidentItem = { id: number; fullName: string; nik: string };

export type StaffFormUpdate = {
  id: number;
  urlId: string;
  name: string;
  imageUrl: string | null;
  imageKey: string | null;
  residentId: number | null;
  residentName: string | null | undefined;
  positionTypeId: number;
  positionName: string;
  startDate: Date;
  endDate?: Date | null | undefined;
  isActive?: boolean | undefined;
};

type StaffFormProps = {
  mode?: 'create' | 'update';
  defaultValues?: StaffFormUpdate;
  positions?: PositionOption[];
  //   units: UnitOption[];
  closeModal?: (value?: boolean) => void;
};

export function StaffForm({
  mode,
  defaultValues,
  // residents,
  positions,
  closeModal,
}: StaffFormProps) {
  const router = useRouter();
  const isEdit = mode === 'update';
  const [isEditingImage, setIsEditingImage] = useState(false);

  const form = useForm<CreateStaffInput | UpdateStaffInput>({
    resolver: zodResolver(isEdit ? updateStaffSchema : createStaffSchema),
    defaultValues: defaultValues ?? {
      isActive: true,
      startDate: new Date(),
      endDate: null,
      name: '',
      image: null,

      //   organizationUnitId: null,
    },
  });

  const availableTypes = positions
    ? positions?.filter((t) => !(t.isUnique && t.isFilled))
    : null;
  const watchResidentId = form.watch('residentId');
  const watchName = form.watch('name');
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

  const onSubmit = async (input: CreateStaffInput | UpdateStaffInput) => {
    console.log('FORM DATA', input);
    const isEdit = mode === 'update';

    // 1️⃣ Tetapkan pesan
    const loadingMessage = isEdit
      ? 'Perbahurui perangkat...'
      : 'Menyimpan perangkat...';
    // const successMessage = isEdit
    //   ? 'Perangkat berhasil diubah!'
    //   : 'Perangkat berhasil dibuat!';
    const errorMessage = isEdit
      ? 'Gagal ubah perangkat'
      : 'Gagal membuat perangkat';

    // 2️⃣ Buat toast loading → return toastId
    const toastId = toast.loading(loadingMessage);

    if (isEdit) {
      const res = await updateStaff(input);

      if (res.success) {
        toast.success(res.message, { id: toastId });
        router.refresh();

        if (closeModal) {
          closeModal(true);
        }
      } else {
        toast.success(res.message, { id: toastId });
      }
    } else {
      try {
        const parsed = createStaffSchema.safeParse(input);
        const res = await createStaff(parsed.data as CreateStaffInput);
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
  };

  const handleCancelEditImage = () => {
    setIsEditingImage(false);
    // Reset field image ke undefined agar form tidak mengirim file sampah/kosong
    form.setValue('image', undefined);
  };

  const isValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;
  const isSubmitted = form.formState.isSubmitted;

  // console.log(form);
  // // console.log(form.getValues());

  const onError = (errors: any) => {
    console.log('❌ VALIDATION ERRORS:', errors);
    toast.error('Form tidak valid, silakan cek inputan yang berwarna merah');
  };

  return (
    <Form {...form}>
      <form
        key={formKey}
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-6"
      >
        {/* Position Type */}

        {availableTypes ? (
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
        ) : (
          <div className="p-2 border rounded-lg">
            <p className="text-muted-foreground">Jabatan </p>
            <p className="text-lg">{defaultValues?.positionName}</p>
          </div>
        )}

        {/* Nama pejabat */}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Pejabat</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g : John Doe, S.Sos"
                  {...field}
                  disabled={!watchPositionTypeId}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- BAGIAN IMAGE START --- */}

        {/* LOGIC: Tampilkan Input JIKA: 
                    1. Bukan mode edit (Create baru)
                    2. Mode edit TAPI user tidak punya foto lama
                    3. User menekan tombol "Ganti Foto" (isEditingImage = true)
                */}
        {!isEdit || !defaultValues?.imageKey || isEditingImage ? (
          <div className="space-y-2 animate-in fade-in zoom-in duration-300">
            {/* Header section untuk Input Mode */}
            {isEdit && defaultValues?.imageKey && (
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Upload className="w-4 h-4" /> Upload Foto Baru
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelEditImage}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8"
                >
                  <Undo2 className="w-4 h-4 mr-2" />
                  Batal & Pakai Foto Lama
                </Button>
              </div>
            )}

            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  {!isEdit && <FormLabel>Foto Pejabat</FormLabel>}
                  <FormControl>
                    <ImageInput
                      {...fieldProps}
                      value={value}
                      onChange={(file) => onChange(file)}
                    />
                  </FormControl>
                  <FormDescription>
                    {isEdit
                      ? 'Pilih gambar baru untuk mengganti foto profil saat ini.'
                      : 'Upload gambar untuk foto profil pejabat.'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ) : (
          // --- VIEW MODE (Tampilkan Gambar Lama) ---
          <div className="space-y-3">
            <FormLabel>Foto Penduduk</FormLabel>

            <div className="group relative w-full max-w-sm aspect-video overflow-hidden rounded-xl border border-border bg-muted shadow-sm transition-all hover:shadow-md">
              {/* Komponen Gambar Existing */}
              <ImageWrapper
                src={defaultValues.imageUrl as string}
                alt={`${defaultValues.name}'s photo`}
                objectFit="cover"
                className="w-full h-full transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay & Tombol "Eye-Catching" */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Button
                  type="button"
                  onClick={() => setIsEditingImage(true)}
                  className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-semibold shadow-lg"
                  variant="secondary" // Putih/Grey cerah agar kontras dengan foto
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Ganti Foto
                </Button>
              </div>

              {/* Badge/Label Info (Optional - agar user tahu ini foto lama) */}
              <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
                Foto Saat Ini
              </div>
            </div>
          </div>
        )}

        {/* --- BAGIAN IMAGE END --- */}

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
                        disabled={!watchName}
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
                        startMonth={new Date(1950, 0)} // Januari 1950
                        endMonth={new Date(new Date().getFullYear(), 11)}
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
                        disabled={!watchName}
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
                        // disabled={(date) => date > new Date()} // contoh: tidak bisa pilih tanggal di masa depan
                        captionLayout="dropdown"
                        startMonth={new Date(1950, 0)}
                        endMonth={new Date(new Date().getFullYear() + 10, 11)}
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
          {closeModal ? (
            <Button
              className="bg-red-400 text-white"
              type="button"
              onClick={() => closeModal()}
            >
              Cancel
            </Button>
          ) : (
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
          )}

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
