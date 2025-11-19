// ===========================
// FamilyForm.tsx (Final)
// ===========================
'use client';

// import React, { useState } from 'react';
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
  FamilyUpdateInput,
  FamilyUpdateSchema,
} from '../_lib/families.zod';
import { DUSUN_LIST, RT_LIST, RW_LIST } from '@/lib/staticData';
import { Textarea } from '@/components/ui/textarea';
import { Autocomplete } from '@/components/autocomplete';
import {
  checkFamilyCardNumberExists,
  createFamilyWithMembers,
  searchResidentsForMember,
  updateFamilyWithMembers,
} from '../_lib/families.actions';
import { Separator } from '@/components/ui/separator';
import { familyRelationshipLabels } from '@/lib/enum';
import { Plus, RefreshCcw, Trash2, Upload } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// helper mengecek member sudah punya HEAD lalu berikan warning
const hasHead = (members: FamilyCreateInput['members']) =>
  members.some((m) => m.familyRelationship === 'HEAD');

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
  const router = useRouter();

  const form = useForm<FamilyCreateInput | FamilyUpdateInput>({
    resolver: zodResolver(
      mode === 'edit' ? FamilyUpdateSchema : FamilyCreateSchema,
    ),
    defaultValues: defaultValues || {
      familyCardNumber: '',
      address: '',
      dusun: '',
      rw: '',
      rt: '',
      members: [],
    },
  });

  // const [headError, setHeadError] = useState<string | null>(null);
  const [missingHeadWarning, setMissingHeadWarning] = useState<string | null>(
    null,
  );
  const [showAddMemberButton, setShowAddMemberButton] = useState(false);

  const { control, handleSubmit, watch } = form;
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: 'members',
  });

  const [kkExists, setKkExists] = useState(false);
  const [checkingKK, setCheckingKK] = useState(false);
  const kkTimeout = useRef<NodeJS.Timeout | null>(null);

  async function handleKkCheck(value: string, onChange: (v: string) => void) {
    onChange(value);

    if (kkTimeout.current) clearTimeout(kkTimeout.current);

    kkTimeout.current = setTimeout(async () => {
      setCheckingKK(true);
      const exists = await checkFamilyCardNumberExists(value);
      setKkExists(exists);
      setCheckingKK(false);
    }, 400);
  }

  const headExists = fields.some((m) => m.familyRelationship === 'HEAD');

  const requiredValues = watch([
    'familyCardNumber',
    'address',
    'dusun',
    'rw',
    'rt',
  ]);

  useEffect(() => {
    const [familyCardNumber, address, dusun, rw, rt] = requiredValues;

    const filled =
      familyCardNumber?.trim() && address?.trim() && dusun && rw && rt;

    const hasErrors =
      !!form.formState.errors.familyCardNumber ||
      !!form.formState.errors.address ||
      !!form.formState.errors.dusun ||
      !!form.formState.errors.rw ||
      !!form.formState.errors.rt;

    setShowAddMemberButton(Boolean(filled && !hasErrors));
  }, [requiredValues, form.formState.errors]);

  // const [lastResults, setLastResults] = useState<ResidentOption[]>([]);

  useEffect(() => {
    const members = watch('members');

    if (!members || members.length === 0) {
      setMissingHeadWarning('Tambahkan minimal satu anggota keluarga.');
      return;
    }

    if (!hasHead(members)) {
      setMissingHeadWarning(
        'Harus ada satu anggota dengan status Kepala Keluarga.',
      );
    } else {
      setMissingHeadWarning(null);
    }
  }, [watch('members')]);

  const onSubmit = async (payload: FamilyCreateInput | FamilyUpdateInput) => {
    console.log('FINAL PAYLOAD:', payload);

    const toastId = toast.loading('Menyimpan keluarga...');

    if (mode === 'edit') {
      try {
        const result = await updateFamilyWithMembers(
          payload as FamilyUpdateInput,
        );

        if (!result.success) {
          toast.error(result.error ?? 'Gagal mengubah keluarga.', {
            id: toastId,
          });
          return;
        }

        // result.data —— berisi family hasil create
        toast.success('Keluarga berhasil diubah!', { id: toastId });

        router.push(`/families/${result?.data?.urlId}`);
      } catch (error) {
        console.log(error);

        toast.error('Terjadi kesalahan server.', { id: toastId });
      }
    } else {
      try {
        const result = await createFamilyWithMembers(
          payload as FamilyCreateInput,
        );

        if (!result.success) {
          toast.error(result.error ?? 'Gagal membuat keluarga.', {
            id: toastId,
          });
          return;
        }

        // result.data —— berisi family hasil create
        toast.success('Keluarga berhasil dibuat!', { id: toastId });

        router.push(`/families/${result?.data?.urlId}`);
      } catch (error) {
        console.log(error);
        toast.error('Terjadi kesalahan server.', { id: toastId });
      }
    }
  };

  const canAddMember = (): boolean => {
    const members = form.getValues('members');

    if (!members || members.length === 0) return true;

    // 1. Tidak boleh ada member tanpa resident
    const hasEmptyResident = members.some(
      (m) => !m.residentId || m.residentId === 0,
    );
    if (hasEmptyResident) return false;

    // 2. Tidak boleh ada fullName kosong (autocomplete belum fix)
    const hasInvalidName = members.some(
      (m) => !m.fullName || m.fullName.trim() === '',
    );
    if (hasInvalidName) return false;

    // 3. Duplicate resident
    const ids = members.map((m) => m.residentId);
    const hasDuplicate = new Set(ids).size !== ids.length;
    if (hasDuplicate) return false;

    return true;
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

              <FormControl className="bg-background">
                <Input
                  {...field}
                  placeholder="e.g : 1234567890123456"
                  onChange={(e) =>
                    handleKkCheck(e.target.value, field.onChange)
                  }
                />
              </FormControl>

              {checkingKK && (
                <p className="text-sm text-muted-foreground">
                  Memeriksa nomor KK...
                </p>
              )}

              {kkExists && (
                <p className="text-sm text-red-500 font-medium">
                  Nomor KK sudah terpakai. Gunakan nomor lain.
                </p>
              )}

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
              <FormControl className="bg-background">
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
                          <FormControl className="w-full bg-background">
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
          <FormLabel className="text-md">
            Anggota Keluarga <span className="text-red-500">*</span>
          </FormLabel>
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2 space-y-2">
            {fields.map((fieldItem, index) => (
              <div
                key={fieldItem.id}
                className="space-y-2 p-3 border rounded-md"
              >
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
                      familyRelationship:
                        fieldItem.familyRelationship || 'CHILD',
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
                <div className="flex items-center justify-between gap-4">
                  <Select
                    value={fieldItem.familyRelationship}
                    onValueChange={(val: FamilyRelationship) => {
                      update(index, { ...fieldItem, familyRelationship: val });
                    }}
                  >
                    <SelectTrigger className="bg-background w-full">
                      <SelectValue placeholder="Pilih hubungan" />
                    </SelectTrigger>

                    <SelectContent className="bg-background">
                      {FamilyRelationshipEnum.options
                        .filter((rel) => {
                          if (rel === 'HEAD') {
                            return (
                              !headExists ||
                              fieldItem.familyRelationship === 'HEAD'
                            );
                          }
                          return true;
                        })
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
          </div>

          {/* {headError && (
            <Alert variant="destructive">
              <AlertTitle>Validasi</AlertTitle>
              <AlertDescription>{headError}</AlertDescription>
            </Alert>
          )} */}
        </div>
        {isSubmitted && missingHeadWarning && (
          <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded text-sm">
            {missingHeadWarning}
          </div>
        )}
        {showAddMemberButton && (
          <div className="flex items-center justify-center">
            <Button
              type="button"
              className="rounded-full"
              size={'icon'}
              disabled={!canAddMember()}
              onClick={() =>
                append({
                  residentId: 0,
                  fullName: '',
                  nik: '',
                  familyRelationship: 'CHILD',
                })
              }
            >
              <Plus />
            </Button>
          </div>
        )}

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
