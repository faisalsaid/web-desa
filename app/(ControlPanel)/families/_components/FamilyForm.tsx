'use client';

import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
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
import { DUSUN_LIST, RW_LIST, RT_LIST } from '@/lib/staticData';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Upload } from 'lucide-react';
import { Autocomplete } from '@/components/autocomplete';
import { Separator } from '@/components/ui/separator';
import {
  createFamily,
  searchResidentsHeadFamilyNull,
  searchResidentsForMember,
} from '../_lib/families.actions';

type Resident = {
  id: number;
  nik: string;
  fullName: string;
};

type Cache = Record<string, Resident[]>;

export default function FamilyForm() {
  const router = useRouter();

  const form = useForm<FamilyCreateInput>({
    resolver: zodResolver(FamilyCreateSchema),
    defaultValues: {
      familyCardNumber: '',
      address: '',
      dusun: '',
      rw: '',
      rt: '',
      headOfFamilyId: undefined,
      members: [],
    },
    mode: 'onChange',
  });

  const { control, handleSubmit, watch, formState } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  });

  const headOfFamilyId = watch('headOfFamilyId');
  const memberIds =
    watch('members')
      ?.map((m) => m.residentId)
      .filter(Boolean) ?? [];
  const excludeIds = headOfFamilyId
    ? [headOfFamilyId, ...memberIds]
    : memberIds;

  // --------------------------
  // Caching for Autocomplete
  // --------------------------
  const headCache = useRef<Cache>({});
  const memberCache = useRef<Cache>({});

  const fetchHead = async (query: string) => {
    if (headCache.current[query]) return headCache.current[query];
    const result = await searchResidentsHeadFamilyNull(query);
    headCache.current[query] = result || [];
    return result;
  };

  const fetchMember = async (query: string) => {
    if (memberCache.current[query]) return memberCache.current[query];
    const result = await searchResidentsForMember(query, excludeIds);
    memberCache.current[query] = result || [];
    return result;
  };

  // --------------------------
  // Submit handler
  // --------------------------
  const onSubmit = async (values: FamilyCreateInput) => {
    console.log(values);

    const toastId = toast.loading('Menyimpan data keluarga...');
    try {
      const res = await createFamily(values);
      if (!res.success) {
        toast.error(res.error || 'Gagal membuat keluarga', { id: toastId });
        return;
      }

      toast.success('Keluarga berhasil dibuat', { id: toastId });
      form.reset();

      const urlId = res.data.urlId;
      router.push(`/families/${urlId}`);
    } catch (err) {
      console.error(err);
      toast.error('Terjadi kesalahan server', { id: toastId });
    }
  };

  console.log(fields);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nomor KK */}
        <FormField
          control={control}
          name="familyCardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nomor KK <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g : 3171011503950001"
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  onWheel={(e) => (e.currentTarget as HTMLElement).blur()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Alamat <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Jl. Panglima Sudirman No. 1"
                  className="resize-none h-32"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Dusun / RW / RT */}
        <div className="grid gap-4 sm:grid-cols-3">
          {['dusun', 'rw', 'rt'].map((fieldName) => {
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
                name={fieldName as any}
                render={() => (
                  <FormItem>
                    <FormLabel>
                      {fieldName.toUpperCase()}{' '}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <Controller
                      name={fieldName as any}
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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

        {/* Kepala Keluarga */}
        <FormField
          control={control}
          name="headOfFamilyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Kepala Keluarga <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Controller
                  name="headOfFamilyId"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      placeholder="Cari nama atau NIK..."
                      value={field.value}
                      onChange={field.onChange}
                      search={fetchHead}
                      getKey={(item) => item.id}
                      displayValue={(item) => item?.fullName ?? ''}
                      renderItem={(item) => (
                        <div>
                          {item.fullName} — {item.nik}
                        </div>
                      )}
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />

        {/* Family Members */}
        <FormLabel className="font-semibold text-lg">Family Members</FormLabel>
        {fields.map((f, index) => (
          <div key={f.id} className="space-y-3 border p-4 rounded-xl">
            <Controller
              control={control}
              name={`members.${index}.residentId`}
              render={({ field }) => (
                <Autocomplete
                  placeholder="Cari nama atau NIK..."
                  value={field.value}
                  onChange={field.onChange}
                  search={fetchMember}
                  getKey={(item) => item.id}
                  displayValue={(item) => item?.fullName ?? ''}
                  renderItem={(item) => (
                    <div>
                      {item.fullName} — {item.nik}
                    </div>
                  )}
                />
              )}
            />

            <div className="flex items-baseline-last justify-between gap-4">
              <FormField
                control={control}
                name={`members.${index}.relationship`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship</FormLabel>
                    <FormControl>
                      <Controller
                        control={control}
                        name={`members.${index}.relationship` as any}
                        render={({ field: ctl }) => (
                          <Select
                            value={ctl.value}
                            onValueChange={ctl.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SPOUSE">Spouse</SelectItem>
                              <SelectItem value="CHILD">Child</SelectItem>
                              <SelectItem value="PARENT">Parent</SelectItem>
                              <SelectItem value="OTHER">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {fields.length > 1 && (
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => remove(index)}
                  size="icon"
                >
                  <Trash2 />
                </Button>
              )}
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="secondary"
          onClick={() => append({ residentId: 0, relationship: 'OTHER' })}
        >
          + Tambah Member
        </Button>

        <Separator />
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="submit"
            className="w-fit"
            disabled={
              formState.isSubmitting ||
              (formState.isSubmitted && !formState.isValid)
            }
          >
            <Upload />
            {formState.isSubmitting ? 'Menyimpan...' : 'Buat Family'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
