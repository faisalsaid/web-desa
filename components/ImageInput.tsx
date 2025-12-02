'use client';

import React, {
  // useCallback,
  useEffect,
  useMemo,
  useRef,
  // useState,
} from 'react';
import { UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  // Value bisa berupa File (upload baru) atau string (URL gambar yang sudah ada)
  value?: File | string | null;
  onChange: (value: File | null) => void;
  onBlur?: () => void;
  disabled?: boolean;
  className?: string;
}

export function ImageInput({
  value,
  onChange,
  onBlur,
  disabled,
  className,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // State untuk preview url
  const previewUrl = useMemo(() => {
    if (!value) return null;
    if (typeof value === 'string') return value; // URL dari Backblaze/DB
    return URL.createObjectURL(value); // Blob URL dari File local
  }, [value]);

  // Cleanup blob url ketika component unmount atau value berubah
  useEffect(() => {
    return () => {
      if (previewUrl && typeof value !== 'string') {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
    // Reset input value agar bisa pilih file yang sama jika dihapus lalu diupload lagi
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    onChange(null);
  };

  // const triggerUpload = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   inputRef.current?.click();
  // };

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* Area Preview jika ada gambar */}
      {previewUrl ? (
        <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg border border-border bg-muted">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-cover"
            priority // Prioritas tinggi karena ini elemen utama form
          />
          <div className="absolute right-2 top-2">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={handleRemove}
              disabled={disabled}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        // Area Dropzone / Upload Trigger
        <div
          onClick={disabled ? undefined : () => inputRef.current?.click()}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 py-10 text-center transition hover:bg-muted/80',
            disabled && 'cursor-not-allowed opacity-60',
          )}
        >
          <div className="rounded-full bg-background p-3 shadow-sm">
            <UploadCloud className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            <span className="font-semibold text-primary">
              Klik untuk upload
            </span>{' '}
            atau drag and drop
          </div>
          <p className="mt-1 text-xs text-muted-foreground/70">
            JPG, PNG, WEBP (Maks. 5MB)
          </p>
        </div>
      )}

      {/* Hidden Input File */}
      <Input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="hidden"
        onChange={handleFileChange}
        onBlur={onBlur}
        disabled={disabled}
      />
    </div>
  );
}
