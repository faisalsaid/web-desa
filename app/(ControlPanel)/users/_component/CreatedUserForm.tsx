'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

const CreatedUserForm = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> New User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2>Add New User</h2>
        </DialogHeader>
        <div>Halo Dialog</div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatedUserForm;
