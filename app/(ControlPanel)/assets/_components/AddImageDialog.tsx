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
import UploadFileComp from '@/components/UploadFileComp';
import { UploadResult } from '../_lib/storage.action';
import { useState } from 'react';

interface Props {
  action: (formData: FormData) => Promise<UploadResult>;
}

const AddImageDialog = ({ action }: Props) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full" size={'icon'}>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Koleksi Galeri</DialogTitle>
          <DialogDescription>
            <span className="text-xs">
              Pilih gambar yang ingin diunggah. Rekomendasi format gambar .jpg
              .jpeg .png ukuran dibawah 1MB.
            </span>
          </DialogDescription>
        </DialogHeader>
        <UploadFileComp
          action={action}
          label="Unggah Gambar"
          onSuccess={() => setDialogOpen(false)}
        />
        {/* <UploadImageForm /> */}
      </DialogContent>
    </Dialog>
  );
};

export default AddImageDialog;
