'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  // DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
// import { CreateFinancingSchema, type CreateFinancingPayload } from "@/schemas/financing";
import { FinancingType } from '@prisma/client';
import {
  FinancingCreateInput,
  FinancingCreateSchema,
  FinancingUpdateData,
  FinancingUpdateDataSchema,
} from '../_lib/financing.zod';
import { getBudgetYearsOptions } from '../../_lib/apbdesa.action';
import { Edit2, Plus, Send } from 'lucide-react';
import { BudgetYearSelector } from '../../_components/BudgetYearSelector';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
} from '@/components/ui/input-group';
import { formatCurrency } from '@/lib/utils/helper';
import { createFinancing, updateFinancing } from '../_lib/financing.actions';
import { useRouter } from 'next/navigation';

interface Props {
  defaultValues?: FinancingUpdateData;
  financingId?: number;
  buttonVariant?:
    | 'default'
    | 'link'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;
}

export default function FinancingFormDialog({
  defaultValues,
  buttonVariant = 'default',
  financingId,
}: Props) {
  const isUpdate = !!financingId;
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [yearListOptions, setYearListOptions] = useState<
    { id: number; year: number }[]
  >([]);

  // Ambil year list options saat mount
  useEffect(() => {
    let isMounted = true;
    getBudgetYearsOptions().then((years) => {
      if (isMounted) {
        setYearListOptions(years);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const form = useForm<FinancingCreateInput | FinancingUpdateData>({
    resolver: zodResolver(
      isUpdate ? FinancingUpdateDataSchema : FinancingCreateSchema,
    ),
    defaultValues: defaultValues ?? {
      yearId: yearListOptions[0]?.id,
      type: FinancingType.RECEIPT,
      description: '',
      amount: '',
    },
  });

  useEffect(() => {
    if (open && yearListOptions.length > 0) {
      const current = form.getValues('yearId');
      if (current) form.setValue('yearId', current);
    }
  }, [yearListOptions, open]);

  // FIX — Update form ketika initialData berubah saat dialog dibuka
  const resetForm = useCallback(() => {
    if (defaultValues && isUpdate) {
      form.reset(defaultValues);
    }
  }, [defaultValues, isUpdate, form]);

  useEffect(() => {
    if (open) resetForm();
  }, [open, resetForm]);

  const descriptionValue = form.watch('description');

  async function handleSubmit(
    values: FinancingCreateInput | FinancingUpdateData,
  ) {
    console.log(values);

    const promise = new Promise<void>(async (resolve, reject) => {
      startTransition(async () => {
        try {
          if (isUpdate) {
            await updateFinancing(
              financingId as number,
              values as FinancingUpdateData,
            );
          } else {
            await createFinancing(values as FinancingCreateInput);
          }
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });

    toast.promise(promise, {
      loading: isUpdate ? 'Menyimpan perubahan...' : 'Menambah data...',
      success: isUpdate
        ? 'Berhasil memperbarui pembiayaan.'
        : 'Berhasil menambahkan pembiayaan.',
      error: 'Gagal memproses data.',
    });

    promise.finally(() => {
      handleReset();
      router.refresh();
    });
  }

  const handleReset = () => {
    form.reset(
      defaultValues ?? {
        yearId: yearListOptions[0]?.id,
        type: FinancingType.RECEIPT,
        description: '',
        amount: '',
      },
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full" size={'icon'} variant={buttonVariant}>
          {isUpdate ? (
            <Edit2 className="text-lime-400 size-4" />
          ) : (
            <Plus className=" size-4" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {!isUpdate ? 'Tambah Pembiayaan' : 'Edit Pembiayaan'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="yearId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun Anggaran</FormLabel>
                    <FormControl>
                      <BudgetYearSelector
                        yearListOptions={yearListOptions}
                        value={field.value}
                        onChange={field.onChange}
                        className="w-32"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Jenis Pembiayaan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={FinancingType.RECEIPT}>
                          Penerimaan
                        </SelectItem>
                        <SelectItem value={FinancingType.EXPENDITURE}>
                          Pengeluaran
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Input placeholder="Uraian pembiayaan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupAddon>
                        <InputGroupText>Rp</InputGroupText>
                      </InputGroupAddon>
                      <InputGroupInput
                        type="text"
                        placeholder="0"
                        value={formatCurrency(field.value ?? '0')} // hanya untuk tampil
                        onChange={(e) => {
                          // Ambil angka murni, hapus ribuan dan karakter non-digit
                          const numericStr = e.target.value.replace(/\D/g, '');
                          field.onChange(numericStr || '0'); // simpan string murni
                        }}
                        disabled={!descriptionValue}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupText>.00</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="destructive"
                onClick={handleReset}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                <Send />
                {!isUpdate ? 'Simpan' : 'Update'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
