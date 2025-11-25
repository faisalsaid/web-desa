'use client';

import { useTransition, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExpenseSector } from '@prisma/client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { createExpense, updateExpense } from '../_lib/expense.actions';
import {
  ExpenseCreate,
  expenseCreateSchema,
  ExpenseUpdate,
  expenseUpdateSchema,
} from '../_lib/expense.zod';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Plus, Send } from 'lucide-react';
import { BudgetYearSelector } from '../../_components/BudgetYearSelector';
import { getBudgetYearsOptions } from '../../_lib/apbdesa.action';
import { Separator } from '@/components/ui/separator';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
} from '@/components/ui/input-group';
import { formatCurrency } from '@/lib/utils/helper';
import { ExpemseSectorOptions } from '@/lib/enum';

interface ExpenseFormProps {
  defaultValues?: ExpenseUpdate;
  expenseId?: string; // untuk update
  onSuccess?: () => void;
  triggerLabel: string;
  dialogTitle?: string;
}

export default function ExpenseFormDialog({
  defaultValues,
  expenseId,
  // onSuccess,
  triggerLabel,
  dialogTitle = 'Form Belanja',
}: ExpenseFormProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isUpdate = !!expenseId;
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

  const form = useForm<ExpenseUpdate | ExpenseCreate>({
    resolver: zodResolver(isUpdate ? expenseUpdateSchema : expenseCreateSchema),
    defaultValues: defaultValues ?? {
      yearId: yearListOptions[0]?.id,
      sector: ExpenseSector.GOVERNMENT_ADMIN,
      description: '',
      budget: '0',
      realized: '0',
    },
  });

  function onSubmit(values: ExpenseUpdate | ExpenseCreate) {
    console.log(values);

    // toast.promise(
    //   new Promise((resolve, reject) => {
    //     startTransition(async () => {
    //       try {
    //         if (expenseId) {
    //           await updateExpense(expenseId, values);
    //         } else {
    //           await createExpense(values);
    //         }
    //         resolve('success');
    //         onSuccess?.();
    //         setOpen(false);
    //       } catch (err) {
    //         reject(err);
    //       }
    //     });
    //   }),
    //   {
    //     loading: expenseId ? 'Menyimpan perubahan...' : 'Menambah data...',
    //     success: expenseId
    //       ? 'Berhasil memperbarui belanja.'
    //       : 'Berhasil menambahkan belanja.',
    //     error: 'Gagal memproses data.',
    //   },
    // );
  }

  const handleCancel = () => {
    form.reset(
      defaultValues ?? {
        yearId: yearListOptions[0]?.id,
        sector: ExpenseSector.GOVERNMENT_ADMIN,
        description: '',
        budget: '0',
        realized: '0',
      },
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          <Button className="rounded-full sm:hidden" size={'icon'}>
            <Plus />
            <span className="hidden">{triggerLabel}</span>
          </Button>
          <Button className="hidden md:flex">
            <Plus />
            <span className="block">{triggerLabel}</span>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            {expenseId ? 'Ubah data belanja' : 'Tambah data belanja baru'}
          </DialogDescription>
        </DialogHeader>

        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="block md:flex items-center gap-4 space-y-4 sm:space-y-0">
              {/* Year */}
              <FormField
                control={form.control}
                name="yearId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun Anggaran </FormLabel>
                    <FormControl>
                      <BudgetYearSelector
                        yearListOptions={yearListOptions}
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sector */}
              <FormField
                control={form.control}
                name="sector"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Sektor</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full ">
                          <SelectValue placeholder="Pilih sektor" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(ExpemseSectorOptions).map(
                            ([key, label]) => (
                              <SelectItem key={key} value={key}>
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
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Budget */}
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anggaran</FormLabel>
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
                        // disabled={!budgeValue}
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

            {/* Realized */}
            <FormField
              control={form.control}
              name="realized"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Realisiasi</FormLabel>
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
                        // disabled={!budgeValue}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupText>.00</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
                // <FormItem>
                //   <FormLabel>Realisasi (Rp)</FormLabel>
                //   <FormControl>
                //     <Input {...field} />
                //   </FormControl>
                //   <FormMessage />
                // </FormItem>
              )}
            />

            <div className="flex items-center justify-end gap-4">
              <Button
                type="button"
                variant="destructive"
                onClick={handleCancel}
              >
                Batal
              </Button>

              <Button type="submit" disabled={isPending}>
                <Send />
                {expenseId ? 'Simpan Perubahan' : 'Tambah Belanja'}
              </Button>
            </div>
          </form>
        </Form>

        <Separator />
        <DialogFooter>
          <p className="text-xs text-muted-foreground italic">
            Pastikan data yang dimasukan valid
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
