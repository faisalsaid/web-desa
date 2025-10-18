'use client';

import { Button } from '@/components/ui/button';
import { Dialog } from '@radix-ui/react-dialog';
import { Plus } from 'lucide-react';

const CreatedUserForm = () => {
  return (
    <div>
      <Button>
        <Plus />
        <span>New User</span>
      </Button>
    </div>
  );
};

export default CreatedUserForm;
