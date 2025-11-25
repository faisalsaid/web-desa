'use client';

import { useState, startTransition } from 'react';

import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import z from 'zod';
import { BudgetYearCreateSchema } from '../_lib/apbdesa.zod';
import { createBudgetYear } from '../_lib/apbdesa.action';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Send } from 'lucide-react';

type FormData = z.infer<typeof BudgetYearCreateSchema>;

interface BudgetYearFormProps {
  closeModal?: () => void;
}
export function BudgetYearForm({ closeModal }: BudgetYearFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(BudgetYearCreateSchema),
    defaultValues: {
      isActive: true,
      isLocked: false,
      isFinalized: false,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: FormData) => {
    // console.log(data);

    const toastId = toast.loading('Membuat tahun anggaran baru...');
    setLoading(true);

    startTransition(async () => {
      try {
        const res = await createBudgetYear(data);
        console.log('RESPONT', res);

        toast.success('Budget Year created successfully!', {
          id: toastId,
        });
        form.reset();
        if (closeModal) {
          closeModal();
        }
      } catch (error: unknown) {
        console.error(error);
        toast.error('Failed to create Budget Year', {
          id: toastId,
        });
      } finally {
        setLoading(false);
      }
    });
  };

  console.log(form.getValues());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value} // fallback
                  onChange={(e) => field.onChange(Number(e.target.value))} // convert to number
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 items-center">
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Active</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isLocked"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Locked</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFinalized"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Finalized</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="flex gap-2 items-center justify-end">
          <Button
            className="text-red-400 bg-muted hover:bg-red-500 hover:text-slate-100"
            type="button"
            onClick={() => {
              form.reset();
              if (closeModal) {
                closeModal();
              }
            }}
          >
            Batalkan
          </Button>
          <Button type="submit" disabled={loading}>
            <Send />
            {loading ? 'Saving...' : 'Buat Tahun Anggaran'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
