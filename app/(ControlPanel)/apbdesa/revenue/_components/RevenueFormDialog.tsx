'use client';

import { useState, startTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RevenueCreateSchema,
  RevenueCreateInput,
  RevenueUpdateSchema,
  RevenueUpdateInput,
} from '../_lib/revenue.zod';
import { createRevenue, updateRevenue } from '../_lib/revenue.actions';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { BudgetYearSelector } from '../../_components/BudgetYearSelector';
import { Edit2, Plus, Send } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
} from '@/components/ui/input-group';
import { RevenueCategoryOptions } from '@/lib/staticData';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils/helper';
import { getBudgetYearsOptions } from '../../_lib/apbdesa.action';
import { useRouter } from 'next/navigation';

interface DialogRevenueFormProps {
  mode: 'create' | 'update';
  initialData?: RevenueUpdateInput;
  // yearListOptions: { id: number; year: number }[];
  onSuccess?: () => void;
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

export function RevenueFormDialog({
  mode,
  initialData,
  // yearListOptions,
  onSuccess,
  buttonVariant = 'default',
}: DialogRevenueFormProps) {
  const router = useRouter();
  const isUpdate = mode === 'update';
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const form = useForm<RevenueCreateInput | RevenueUpdateInput>({
    resolver: zodResolver(isUpdate ? RevenueUpdateSchema : RevenueCreateSchema),
    defaultValues: initialData || {
      yearId: yearListOptions[0]?.id,
      category: 'OWN_SOURCE',
      description: '',
      budget: '0',
      realized: '0',
    },
  });

  // FIX — Update form ketika initialData berubah saat dialog dibuka
  useEffect(() => {
    if (open && initialData && isUpdate) {
      form.reset(initialData);
    }
  }, [open, initialData, isUpdate, form]);

  const handleSubmit = (values: RevenueCreateInput | RevenueUpdateInput) => {
    console.log(values);

    setLoading(true);
    const toastId = toast.loading(
      isUpdate ? 'Mengubah pendapatan...' : 'Merekam pendapatan...',
    );
    startTransition(async () => {
      try {
        if (isUpdate) {
          await updateRevenue(values as RevenueUpdateInput);
          toast.success('Berhasil ubah pendapatan!', { id: toastId });
        } else {
          await createRevenue(values as RevenueCreateInput);
          toast.success('Berhasil merekam pendapatan!', { id: toastId });
        }

        form.reset(); // reset form
        setOpen(false); // close dialog
        onSuccess?.();
      } catch (error: unknown) {
        console.error(error);
        toast.error('Tindakan gagal', { id: toastId });
      } finally {
        setLoading(false);
        router.refresh();
      }
    });
  };

  const handleCancel = () => {
    form.reset(
      initialData || {
        yearId: yearListOptions[0]?.id,
        category: 'OWN_SOURCE',
        description: '',
        budget: '',
        realized: '',
      },
    );
    setOpen(false);
  };

  const descriptionValue = form.watch('description');
  const budgeValue = form.watch('budget');

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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? 'Ubah Pendapatan' : 'Rekam Pendapatan'}
          </DialogTitle>
          <DialogDescription>
            Masukan detail untuk {isUpdate ? 'mengubah' : 'membuat'} pendapatan
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="flex gap-4 w-full">
              {/* Year Selector */}
              <FormField
                control={form.control}
                name="yearId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun</FormLabel>
                    <FormControl>
                      <BudgetYearSelector
                        yearListOptions={yearListOptions}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {RevenueCategoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g : Pendapatan pajak daerah "
                      {...field}
                    />
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
                  <FormLabel>Budget</FormLabel>
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

            {/* Realized */}
            <FormField
              control={form.control}
              name="realized"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Realized</FormLabel>
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
                        disabled={!budgeValue}
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

            <DialogFooter className="flex justify-between">
              <Button
                variant="destructive"
                type="button"
                onClick={handleCancel}
                disabled={loading}
              >
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
                <Send />
                {isUpdate ? 'Ubah Pendapatan' : 'Rekam Pendapatan'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
