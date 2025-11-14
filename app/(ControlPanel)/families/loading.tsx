'use client';

import { Spinner } from '@/components/ui/spinner';

const FamiliesLoading = () => {
  return (
    <div className="flex items-center justify-center">
      <Spinner />
    </div>
  );
};

export default FamiliesLoading;
