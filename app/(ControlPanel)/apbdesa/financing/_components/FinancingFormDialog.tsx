'use client';

import { useEffect, useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
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
import { Edit2, Plus } from 'lucide-react';

interface Props {
  defaultValues?: FinancingUpdateData;
  mode?: 'create' | 'update';
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
  mode = 'create',
  buttonVariant = 'default',
}: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [yearListOptions, setYearListOptions] = useState<
    { id: number; year: number }[]
  >([]);

  const isUpdate = mode === 'update';
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
      mode === 'update' ? FinancingUpdateDataSchema : FinancingCreateSchema,
    ),
    defaultValues: defaultValues ?? {
      yearId: yearListOptions[0]?.id,
      type: FinancingType.RECEIPT,
      description: '',
      amount: '',
    },
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    values: FinancingCreateInput | FinancingUpdateData,
  ) {
    console.log(values);
  }

  function handleCancel() {
    form.reset();
    setOpen(false);
  }

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
            {mode === 'create' ? 'Tambah Pembiayaan' : 'Edit Pembiayaan'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="yearId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tahun Anggaran</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="2025" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Pembiayaan</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
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
                    <Input placeholder="12000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {mode === 'create' ? 'Simpan' : 'Update'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
