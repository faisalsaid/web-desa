'use client';

import React, { useState } from 'react';
import { UploadResult } from '../app/(ControlPanel)/assets/_lib/storage.action';
import { Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface FileUploaderProps {
  action: (formData: FormData) => Promise<UploadResult>;
  label?: string;
  onSuccess?: () => void;
}

export default function UploadFileComp({
  action,
  label = 'Upload File',
  onSuccess,
}: FileUploaderProps) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);

  async function handleAction(formData: FormData): Promise<void> {
    const uploadPromise = new Promise<UploadResult>(async (resolve, reject) => {
      try {
        const result = await action(formData);
        if (result.success) resolve(result);
        else reject(result.error || 'Gagal upload');
      } catch (err) {
        reject(err);
      }
    });

    toast.promise(uploadPromise, {
      loading: 'Mengunggah...',
      success: 'Upload berhasil!',
      error: 'Gagal mengunggah file.',
    });

    uploadPromise
      .then(() => {
        setTimeout(() => router.refresh(), 300);
        if (onSuccess) {
          onSuccess(); // <-- dialog akan tertutup
        }
      })
      .catch(() => {});

    return; // ⬅️ penting: jangan return UploadResult!
  }

  return (
    <div className="space-y-4 p-4 border rounded-xl bg-muted">
      <form action={handleAction} className="space-y-4">
        <input
          id="imageInput"
          type="file"
          name="file"
          accept="image/*"
          className="hidden"
          required
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setPreview(URL.createObjectURL(file));
            }
          }}
        />

        {!preview ? (
          <label
            htmlFor="imageInput"
            className="h-48 w-full border border-dashed border-muted-foreground
              flex flex-col items-center justify-center
              rounded-xl cursor-pointer bg-background
              hover:bg-accent transition"
          >
            <ImageIcon className="size-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Silahkan pilih gambar
            </p>
          </label>
        ) : (
          <div className="relative h-48 w-full cursor-pointer rounded-xl overflow-hidden">
            <label htmlFor="imageInput">
              <Image
                src={preview}
                alt="preview"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/40 text-white text-xs py-1 text-center">
                Klik untuk ganti gambar
              </div>
            </label>
          </div>
        )}

        <Button type="submit" className="w-full">
          {label}
        </Button>
      </form>
    </div>
  );
}
