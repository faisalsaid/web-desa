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
import { deleteStaffPositionType } from '../_lib/organitatons.action';

export default function DeleteStaffPositionButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const toastId = toast.loading('Menghapus data...');

    setLoading(true);

    const result = await deleteStaffPositionType(id);

    if (result.success) {
      toast.success('Jenis jabatan berhasil dihapus', { id: toastId });
      router.push('/organitations/settings');
      router.refresh();
    } else {
      toast.error(result.message || 'Gagal menghapus', { id: toastId });
    }

    setLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full " variant={'outline'}>
          <Trash2 className="text-red-500" />
          <span className="text-red-500"> Hapus</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Jenis Jabatan?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dibatalkan. Jenis Jabatan akan{' '}
            <span className="text-red-500 uppercase font-semibold">
              dihapus permanent
            </span>{' '}
            dari sistem
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
