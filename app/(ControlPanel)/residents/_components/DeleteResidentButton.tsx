'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { deleteResident } from '../_lib/residents.actions';

export default function DeleteResidentButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const toastId = toast.loading('Menghapus data...');

    setLoading(true);

    const result = await deleteResident(id);

    if (result.success) {
      toast.success('Data penduduk berhasil dihapus', { id: toastId });
      router.push('/residents');
      router.refresh();
    } else {
      toast.error(result.message || 'Gagal menghapus', { id: toastId });
    }

    setLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="destructive" className="rounded-full">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Penduduk?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dibatalkan. Data penduduk akan{' '}
            <span className="text-red-500 uppercase font-semibold">
              dihapus dari sistem
            </span>{' '}
            . Hubungi administrator jika ingin mengembalikan data di kemudian
            hari.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? 'Menghapus...' : 'Hapus'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
