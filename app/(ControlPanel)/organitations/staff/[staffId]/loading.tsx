'use client';

import { Spinner } from '@/components/ui/spinner';

export default function StaffDetailLoading() {
  return (
    <div className="flex items-center justify-center">
      <Spinner />
    </div>
  );
}
