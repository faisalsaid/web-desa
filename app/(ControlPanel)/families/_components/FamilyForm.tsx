// ===========================
// FamilyForm.tsx (Final)
// ===========================
'use client';

import React, { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
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
  FamilyCreateInput,
  FamilyCreateSchema,
  FamilyRelationship,
  FamilyRelationshipEnum,
} from '../_lib/families.zod';
import { DUSUN_LIST, RT_LIST, RW_LIST } from '@/lib/staticData';
import { Textarea } from '@/components/ui/textarea';
import { Autocomplete } from '@/components/autocomplete';
import { searchResidentsForMember } from '../_lib/families.actions';
import { Separator } from '@/components/ui/separator';
import { familyRelationshipLabels } from '@/lib/enum';
import { RefreshCcw, Trash2, Upload } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

type LocationField = 'dusun' | 'rw' | 'rt';

// Struktur resident hasil search
export type ResidentOption = {
  id: number;
  fullName: string;
  nik: string;
};

export interface FamilyFormProps {
  mode?: 'create' | 'edit';
  defaultValues?: Partial<FamilyCreateInput>;
  // initialData?: FamilyCreateInput;
  // initialHeadDisplay?: string;
  // initialMembersDisplay?: string[];
}

export default function FamilyForm({
  mode = 'create',
  defaultValues,
}: FamilyFormProps) {
  const form = useForm<FamilyCreateInput>({
    resolver: zodResolver(FamilyCreateSchema),
    defaultValues: defaultValues || {
      familyCardNumber: '',
      address: '',
      dusun: '',
      rw: '',
      rt: '',
      members: [],
    },
  });

  const { control, handleSubmit } = form;
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: 'members',
  });

  // const [lastResults, setLastResults] = useState<ResidentOption[]>([]);

  const onSubmit = (data: FamilyCreateInput) => {
    console.log('FINAL PAYLOAD:', data);
  };

  const isValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;
  const isSubmitted = form.formState.isSubmitted;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="familyCardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nomor KK <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="1234567890123456" />
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
                Alamat <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="h-24 resize-none"
                  placeholder="Jl. Pantai No. 10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DUSUN / RW / RT */}
        <div className="grid gap-4 sm:grid-cols-3">
          {(['dusun', 'rw', 'rt'] as LocationField[]).map((fieldName) => {
            const list =
              fieldName === 'dusun'
                ? DUSUN_LIST
                : fieldName === 'rw'
                ? RW_LIST
                : RT_LIST;
            return (
              <FormField
                key={fieldName}
                control={control}
                name={fieldName}
                render={() => (
                  <FormItem>
                    <FormLabel>
                      {fieldName.toUpperCase()}{' '}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <Controller
                      name={fieldName}
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue
                                placeholder={`Pilih ${fieldName.toUpperCase()}`}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {list.map((opt) => (
                              <SelectItem key={opt.key} value={opt.key}>
                                {opt.value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
        </div>

        <Separator />

        {/* Members */}
        <div className="space-y-3">
          <FormLabel className="text-md">Anggota Keluarga</FormLabel>

          {fields.map((fieldItem, index) => (
            <div key={fieldItem.id} className="space-y-2 p-3 border rounded-md">
              {/* Autocomplete */}
              <Autocomplete<ResidentOption>
                placeholder="Cari warga..."
                value={
                  fieldItem.fullName
                    ? {
                        id: fieldItem.residentId,
                        fullName: fieldItem.fullName,
                        nik: fieldItem.nik,
                      }
                    : null
                }
                onChange={(item) => {
                  if (!item) return;
                  update(index, {
                    residentId: item.id,
                    fullName: item.fullName,
                    nik: item.nik,
                    familyRelationship: fieldItem.familyRelationship || 'CHILD',
                  });
                }}
                search={async (q) => {
                  const exclude = fields
                    .filter((_, i) => i !== index)
                    .map((m) => m.residentId)
                    .filter(Boolean);
                  const res = await searchResidentsForMember(q, exclude);
                  // setLastResults(res);
                  return res;
                }}
                displayValue={(item) =>
                  item ? `${item.fullName} – ${item.nik}` : ''
                }
                getKey={(item) => item.id}
              />

              {/* Relationship */}
              <div className="flex items-center justify-between">
                <Select
                  value={fieldItem.familyRelationship}
                  onValueChange={(val) =>
                    update(index, {
                      ...fieldItem,
                      familyRelationship: val as FamilyRelationship,
                    })
                  }
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Pilih hubungan" />
                  </SelectTrigger>

                  <SelectContent>
                    {FamilyRelationshipEnum.options
                      // .filter((rel) => rel !== 'HEAD') // HEAD tidak boleh muncul di member
                      .map((rel) => (
                        <SelectItem key={rel} value={rel}>
                          {familyRelationshipLabels[rel]}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => remove(index)}
                  className="rounded-full"
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}

          <Button
            type="button"
            onClick={() =>
              append({
                residentId: 0,
                fullName: '',
                nik: '',
                familyRelationship: 'CHILD',
              })
            }
          >
            Tambah Anggota
          </Button>
        </div>
        <Separator />
        <div className="flex items-center justify-end gap-4 w-full mt-5">
          {isSubmitting ? null : (
            <Button
              type="button"
              variant="secondary"
              onClick={() => form.reset()} // <-- reset ke defaultValues
              className="text-red-500"
            >
              <RefreshCcw className=" h-4 w-4" />
              Reset
            </Button>
          )}
          <Button
            className="bg-green-300 text-green-900"
            disabled={isSubmitting || (isSubmitted && !isValid)}
            type="submit"
          >
            {isSubmitting ? <Spinner /> : <Upload className=" h-4 w-4" />}{' '}
            {isSubmitting
              ? 'Menyimpan...'
              : mode === 'edit'
              ? 'Ubah Family'
              : 'Buat Family'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
