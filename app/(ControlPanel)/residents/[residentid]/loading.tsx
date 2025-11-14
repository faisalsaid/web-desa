'use client';

import { Spinner } from '@/components/ui/spinner';

export default function ResidentDetailLoading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex items-center justify-center">
      <Spinner />
    </div>
  );
}
