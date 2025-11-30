'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';

interface ImageSelectProps {
  label?: string;
  value?: string | null; // URL string from server
  onChange?: (file: File | null) => void;
}

export default function ImageSelect({
  label = 'Upload Image',
  value,
  onChange,
}: ImageSelectProps) {
  const [preview, setPreview] = useState<string>(value ?? '');
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    if (onChange) onChange(file);
  };

  const removeImage = () => {
    setPreview('');
    if (onChange) onChange(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="space-y-2 w-full">
      <label className="text-sm font-medium">{label}</label>

      <Card
        className="p-3 border-dashed border-2 rounded-2xl cursor-pointer"
        onClick={() => fileRef.current?.click()}
      >
        <CardContent className="flex flex-col items-center justify-center">
          {preview ? (
            <div className="relative w-40 h-40">
              <Image
                src={preview}
                alt="preview"
                fill
                className="object-cover rounded-xl"
              />

              <Button
                type="button"
                size="icon"
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
                className="absolute -top-2 -right-2 rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Click to select image
            </p>
          )}
        </CardContent>
      </Card>

      <Input
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}
