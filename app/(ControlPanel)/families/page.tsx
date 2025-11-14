import ContentCard from '../_component/ContentCard';
import { Button } from '@/components/ui/button';

import { HousePlus, Search } from 'lucide-react';
import Link from 'next/link';

const FamiliesPage = () => {
  return (
    <div className="space-y-4">
      <ContentCard className=" ">
        <div className="flex gap-4 items-center justify-between">
          <h1 className="text-xl font-semibold">Daftar Keluarga</h1>
          <div>
            <Link href={'/families/create'}>
              <Button>
                <HousePlus /> <span>Keluarga Baru</span>
              </Button>
            </Link>
          </div>
        </div>
      </ContentCard>
    </div>
  );
};

export default FamiliesPage;
