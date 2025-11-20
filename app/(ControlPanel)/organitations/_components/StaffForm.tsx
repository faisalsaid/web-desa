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
import { Autocomplete } from '@/components/autocomplete';
import { searchResidentToStaff } from '../_lib/organitatons.action';
import { useEffect, useState } from 'react';

type ResidentOption = { id: number; fullName: string };
type PositionOption = { id: number; name: string };
type UnitOption = { id: number; name: string };

type ResidentItem = { id: number; fullName: string; nik: string };

type StaffFormProps = {
  mode: 'create' | 'update';
  defaultValues?: Partial<UpdateStaffInput>;
  // residents: ResidentOption[];
  positions: PositionOption[];
  //   units: UnitOption[];

  //   onSubmit: (values: CreateStaffInput | UpdateStaffInput) => Promise<void>;
};

export function StaffForm({
  mode,
  defaultValues,
  // residents,
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

        {/* Resident */}
        <FormField
          control={form.control}
          name="residentId"
          render={({ field }) => (
            <Autocomplete<ResidentItem>
              label="Resident"
              placeholder="Cari nama / NIK..."
              // bentuk data di form = id number
              value={null} // tidak dipakai karena kita simpan id
              onChange={(resident) => {
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
