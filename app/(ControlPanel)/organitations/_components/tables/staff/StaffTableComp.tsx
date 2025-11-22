'use client';

import { RefreshCcw, Search, SearchIcon } from 'lucide-react';
import { GetStaffs } from '../../../_lib/organitatons.action';
import { staffColumns } from './staff-columns';
import StaffDataTable from './staff-data-table';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface StaffTableCompProsp {
  data: GetStaffs | null;
}
const StaffTableComp = ({ data }: StaffTableCompProsp) => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');

  console.log(query);

  if (!data) {
    return (
      <div className="flex items-center justify-center p-8 text-2xl text-muted-foreground">
        Belum ada daftar perangkat desa! Hubungi adminstrator.
      </div>
    );
  }

  const handleReset = () => {
    setQuery('');
    router.push('staff?page=1');
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center ">
        <div className="flex gap-2 items-center max-w-96">
          <InputGroup className=" bg-background w-802">
            <InputGroupInput
              placeholder="Cari nama atau jenis perangkat..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
          <Button
            onClick={() =>
              router.push(`staff?page=1&search=${encodeURIComponent(query)}`)
            }
          >
            <Search />
            Cari
          </Button>
        </div>
        <Button
          className="text-red-500 bg-muted active:bg-red-500 active:text-white hover:bg-red-400  hover:text-white"
          onClick={handleReset}
        >
          <RefreshCcw /> Clear
        </Button>
      </div>
      <StaffDataTable
        columns={staffColumns}
        data={data.data}
        page={data.page as number}
        totalPages={data.totalPages as number}
      />
    </div>
  );
};

export default StaffTableComp;
