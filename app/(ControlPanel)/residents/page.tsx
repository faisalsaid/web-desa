import { Button } from '@/components/ui/button';
import ContentCard from '../_component/ContentCard';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';

const ResidentsPage = () => {
  return (
    <div className="space-y-4">
      <ContentCard className=" ">
        <div className="flex gap-4 items-center justify-between">
          <h2 className="text-xl font-semibold">Data Penduduk</h2>
          <div>
            <Link href={'/residents/add'}>
              <Button>
                <UserPlus /> <span>Tambah Warga</span>
              </Button>
            </Link>
          </div>
        </div>
      </ContentCard>
    </div>
  );
};

export default ResidentsPage;
