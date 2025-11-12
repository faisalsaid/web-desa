'use client';

import { Button } from '@/components/ui/button';
import { Edit, ImageUp } from 'lucide-react';
import { useEffect, useRef, useState, useTransition } from 'react';
import {
  Dialog,
  //   DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { uploadVillageLogo } from '../_lib/vilageProvile.action';
import { toast } from 'sonner';

const LogoForm = () => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(''); // hasil upload dari server
  const [preview, setPreview] = useState<string | null>(null); // preview lokal
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ Reset form setiap dialog ditutup
  useEffect(() => {
    if (!open) {
      // reset preview dan input file
      setPreview(null);
      setUrl('');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }, [open]);

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const toastId = toast.loading('Mengunggah logo...');
      try {
        const imageUrl = await uploadVillageLogo(formData);
        // sukses upload
        setUrl(imageUrl);
        toast.success('Logo berhasil diunggah!', {
          id: toastId,
        });

        // bersihkan form dan preview
        setPreview(null);
        if (inputRef.current) inputRef.current.value = '';

        // tutup dialog
        setOpen(false);
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || 'Upload gagal, coba lagi.', {
          id: toastId,
        });
      }
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowed.includes(file.type)) {
        alert('File harus JPG, JPEG, atau PNG');
        e.target.value = '';
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Edit /> Ganti
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className="text-xl font-semibold">
              Unggah Logo Desa Terbaru :
            </h2>
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="p-6 space-y-6 max-w-md mx-auto">
          {/* Preview sebelum upload */}
          {preview && (
            <div className="space-y-2 text-center">
              <div className="text-sm text-muted-foreground">Preview Logo:</div>
              <img
                src={preview}
                alt="preview"
                className="w-40 h-40 object-contain border rounded-lg mx-auto"
              />
            </div>
          )}

          <form action={handleSubmit} className="space-y-4">
            <Input
              type="file"
              name="file"
              accept="image/png,image/jpeg"
              onChange={handleFileChange}
            />

            <Button type="submit" disabled={isPending}>
              <ImageUp />
              {isPending ? 'Mengungah...' : 'Unggah'}
            </Button>
          </form>

          {url && (
            <div className="space-y-2 text-center">
              <div className="text-sm text-green-600 font-medium">
                ✅ Upload berhasil!
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogoForm;
