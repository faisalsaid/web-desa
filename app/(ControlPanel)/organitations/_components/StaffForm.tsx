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
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
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

type ResidentOption = { id: number; fullName: string };
type PositionOption = { id: number; name: string };
type UnitOption = { id: number; name: string };

type StaffFormProps = {
  mode: 'create' | 'update';
  defaultValues?: Partial<UpdateStaffInput>;
  residents: ResidentOption[];
  positions: PositionOption[];
  //   units: UnitOption[];

  //   onSubmit: (values: CreateStaffInput | UpdateStaffInput) => Promise<void>;
};

export function StaffForm({
  mode,
  defaultValues,
  residents,
  positions,
}: //   units,
//   onSubmit,
StaffFormProps) {
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

  const onSubmit = (values: CreateStaffInput | UpdateStaffInput) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Resident */}
        <FormField
          control={form.control}
          name="residentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resident</FormLabel>
              <Select
                onValueChange={(v) => field.onChange(Number(v))}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Resident" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {residents.map((r) => (
                    <SelectItem key={r.id} value={r.id.toString()}>
                      {r.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jabatan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {positions.map((pos) => (
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

        {/* Start Date */}
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal Mulai</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  value={
                    typeof field.value === 'string'
                      ? field.value
                      : new Date(field.value).toISOString().slice(0, 16)
                  }
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* End Date */}
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal Selesai (opsional)</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  value={
                    field.value
                      ? new Date(field.value).toISOString().slice(0, 16)
                      : ''
                  }
                  onChange={(e) => field.onChange(e.target.value || null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Active */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={(v) => field.onChange(v === 'true')}
                defaultValue={field.value ? 'true' : 'false'}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Aktif</SelectItem>
                  <SelectItem value="false">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type="submit" className="w-full">
          {mode === 'create' ? 'Tambah Staff' : 'Simpan Perubahan'}
        </Button>
      </form>
    </Form>
  );
}
