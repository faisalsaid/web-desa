'use client';

import React, { useState } from 'react';
import { UploadResult } from '../app/(ControlPanel)/assets/_lib/storage.action';
import { Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';

interface FileUploaderProps {
  action: (formData: FormData) => Promise<UploadResult>;
  label?: string;
}

export default function UploadFileComp({
  action,
  label = 'Upload File',
}: FileUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [result, setResult] = useState<UploadResult | null>(null);

  async function handleAction(formData: FormData) {
    setUploading(true);
    const response = await action(formData);
    setResult(response);
    setUploading(false);
  }

  return (
    <div className="space-y-4 p-4 border rounded-xl bg-muted">
      {/* Result Success */}
      {result?.success && result.url && (
        <div className="p-3 border rounded-lg bg-green-50 text-green-700">
          <p className="text-center">Berhasil mengunggah!</p>
          {/* <a
            href={result.url}
            target="_blank"
            className="underline text-blue-600"
          >
            Lihat file
          </a> */}
        </div>
      )}
      <form action={handleAction} className="space-y-4">
        {/* Input File (Hidden) */}
        <input
          id="imageInput"
          type="file"
          name="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = URL.createObjectURL(file);
              setPreview(url);
            }
          }}
          required
        />

        {/* Custom Upload Box */}
        {!preview ? (
          <label
            htmlFor="imageInput"
            className="
              h-48 w-full border border-dashed border-muted-foreground
              flex flex-col items-center justify-center
              rounded-xl cursor-pointer bg-background
              hover:bg-accent transition
            "
          >
            <ImageIcon className="size-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Silahkan pilih gambar
            </p>
          </label>
        ) : (
          <div className="overflow-hidden rounded-lg">
            <label
              htmlFor="imageInput"
              className="relative h-48 w-full cursor-pointer rounded-xl overflow-hidden"
            >
              <div className=" w-full aspect-square max-h-80 relative">
                <Image
                  src={preview}
                  alt="preview"
                  className="object-cover w-full h-full"
                  fill
                />
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-black/40 text-white text-xs py-1 text-center">
                Klik untuk ganti gambar
              </div>
            </label>
          </div>
        )}

        {/* Submit Button */}
        <Button type="submit" disabled={uploading} className="w-full">
          {uploading ? 'Uploading...' : label}
        </Button>
      </form>

      {/* Result Error */}
      {result?.error && <p className="text-red-600 text-sm">{result.error}</p>}
    </div>
  );
}
