'use client';

import React, { useState } from 'react';
import { UploadResult } from '../app/(ControlPanel)/_lib/storage.action';

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
      <form action={handleAction} className="space-y-2">
        <input
          type="file"
          name="file"
          required
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = URL.createObjectURL(file);
              setPreview(url);
            }
          }}
        />

        {preview && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Preview:</p>
            <img src={preview} alt="preview" className="max-h-40 rounded-md" />
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
        >
          {uploading ? 'Uploading...' : label}
        </button>
      </form>

      {result?.success && result.url && (
        <div className="p-3 border rounded bg-green-50 text-green-700">
          <p>Upload berhasil!</p>
          <a
            href={result.url}
            target="_blank"
            className="underline text-blue-600"
          >
            Lihat file
          </a>
        </div>
      )}

      {result?.error && <p className="text-red-600 text-sm">{result.error}</p>}
    </div>
  );
}
