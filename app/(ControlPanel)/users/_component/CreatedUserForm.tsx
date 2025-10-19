'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreaterUserSchema,
  createUserSchema,
  userRoles,
} from '../_lib/users.zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { registerNewUser } from '../_lib/users.action';

const CreatedUserForm = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<CreaterUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      // name: '',
      email: '',
      role: 'USER',
    },
  });

  const onSubmit = async (data: CreaterUserSchema) => {
    const id = toast.loading('Register new user...');
    const res = await registerNewUser({ data });

    console.log(data);

    toast.dismiss(id);

    if (!res.ok) {
      // Error validasi field level
      if ('fieldErrors' in res) {
        Object.values(res.fieldErrors)
          .flat()
          .forEach((msg) => toast.error(msg));
        return;
      }
      toast.error(res.error);
      return;
    }

    toast.success('Account created successfully!');

    // ✅ Reset form
    form.reset();

    // ✅ Tutup dialog
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> New User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h2 className="text-xl font-semibold">Add New User</h2>
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset
              disabled={form.formState.isSubmitting}
              className="space-y-4"
            >
              {/* <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm"
                        placeholder="e.g. Jhon Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm"
                        placeholder="e.g. jhon-doe@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {userRoles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <div className="flex gap-4 items-center justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-fit">
                  {form.formState.isSubmitting
                    ? 'Processing...'
                    : 'Register New User'}
                </Button>
              </div>
            </fieldset>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatedUserForm;
