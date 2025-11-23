'use client';

import { Spinner } from '@/components/ui/spinner';

export default function CpLoading() {
  return (
    <div className="flex items-center justify-center">
      <Spinner />
    </div>
  );
}
