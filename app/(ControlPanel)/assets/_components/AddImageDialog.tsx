'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import UploadImageForm from './UploadImageForm';
const AddImageDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full" size={'icon'}>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Koleksi Galeri</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <UploadImageForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddImageDialog;
