'use client';

import { useTransition, useState } from 'react';
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
import { Plus } from 'lucide-react';

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
  onSuccess,
  triggerLabel,
  dialogTitle = 'Form Belanja',
}: ExpenseFormProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isUpdate = !!expenseId;

  const form = useForm<ExpenseUpdate | ExpenseCreate>({
    resolver: zodResolver(isUpdate ? expenseUpdateSchema : expenseCreateSchema),
    defaultValues: defaultValues ?? {
      yearId: 0,
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Year */}
            <FormField
              control={form.control}
              name="yearId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tahun Anggaran</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
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
                <FormItem>
                  <FormLabel>Sektor</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih sektor" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ExpenseSector).map((sec) => (
                          <SelectItem key={sec} value={sec}>
                            {sec.replace(/_/g, ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <FormLabel>Anggaran (Rp)</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Realisasi (Rp)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending}>
              {expenseId ? 'Simpan Perubahan' : 'Tambah Belanja'}
            </Button>
          </form>
        </Form>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Batal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
