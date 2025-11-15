'use client';

import { useEffect, useState } from 'react';
// import { createFamily } from './actions';
// import { FamilyCreateInput, FamilyCreateSchema } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner'; // opsional, untuk feedback

// Shadcn UI Components
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
import { DUSUN_LIST, RT_LIST, RW_LIST } from '@/lib/staticData';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import {
  createFamily,
  searchResidentsHeadFamilyNull,
} from '../_lib/families.actions';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import { useRouter } from 'next/navigation';

type Resident = {
  id: number;
  nik: string;
  fullName: string;
};

export function CreateFamilyForm() {
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
    },
    mode: 'onChange',
  });

  const [query, setQuery] = useState<string>('');
  const [suggestResidents, setSuggestResidents] = useState<Resident[]>([]);
  const [commandInput, setCommandInput] = useState<string>('');
  const [showSugest, setShowSugest] = useState<boolean>(false);

  console.log('LIST =>', suggestResidents);
  console.log('QUERY =>', query);

  useEffect(() => {
    if (query.trim().length < 3) {
      setSuggestResidents([]);
      return;
    }

    const delay = setTimeout(async () => {
      const result = await searchResidentsHeadFamilyNull(query.trim());
      setSuggestResidents(result || []);
    }, 250);

    return () => clearTimeout(delay);
  }, [query]);

  async function onSubmit(values: FamilyCreateInput) {
    // Buat toast loading yang bisa di-update
    const toastId = toast.loading('Menyimpan data keluarga...');

    try {
      const res = await createFamily(values);

      if (!res.success) {
        toast.error(res.error || 'Gagal membuat keluarga', { id: toastId });
        return;
      }

      toast.success('Keluarga berhasil dibuat', { id: toastId });

      const urlId = res?.data?.urlId;
      router.push(`/families/${urlId}`);

      // opsional: reset form jika perlu
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error('Terjadi kesalahan server', { id: toastId });
    }
  }

  const disabled = form.formState.isSubmitted && !form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="familyCardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nomor KK : <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g : 3171011503950001"
                  type="number"
                />
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
                Alamat : <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="e.g : Jl. Panglima Sudirman No. 1"
                  className="resize-none h-32" // mencegah resize
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="dusun"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Dusun : <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih dusun" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {DUSUN_LIST.map((dusun) => (
                      <SelectItem key={dusun.key} value={dusun.key}>
                        {dusun.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* // RW */}
          <FormField
            control={form.control}
            name="rw"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  RW : <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih RW" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {RW_LIST.map((rw) => (
                      <SelectItem key={rw.key} value={rw.key}>
                        {rw.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* // RT */}
          <FormField
            control={form.control}
            name="rt"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  RT : <span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih RT" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {RT_LIST.map((rt) => (
                      <SelectItem key={rt.key} value={rt.key}>
                        {rt.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="headOfFamilyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Kepala Keluarga <span className="text-red-500">*</span>
              </FormLabel>

              <FormControl>
                <Command shouldFilter={false}>
                  <CommandInput
                    onBlur={() => setTimeout(() => setShowSugest(false), 150)}
                    placeholder="Cari nama atau NIK..."
                    value={commandInput}
                    onValueChange={(text) => {
                      setCommandInput(text);
                      setQuery(text);

                      if (text.length >= 3) setShowSugest(true);
                      else setShowSugest(false);
                    }}
                  />

                  {showSugest && (
                    <CommandList>
                      <CommandEmpty>Tidak ada hasil</CommandEmpty>
                      <CommandGroup heading="Hasil Pencarian">
                        {suggestResidents.map((resident) => (
                          <CommandItem
                            key={resident.id}
                            onSelect={() => {
                              field.onChange(resident.id);
                              setCommandInput(resident.fullName);
                              setShowSugest(false);
                            }}
                          >
                            {resident.fullName} — {resident.nik}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  )}
                </Command>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="submit"
            className="w-fit"
            disabled={disabled || isSubmitting}
          >
            <Upload />
            {form.formState.isSubmitting ? 'Menyimpan...' : 'Buat Family'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
