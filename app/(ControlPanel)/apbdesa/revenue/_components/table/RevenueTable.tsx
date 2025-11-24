'use client';

import { Input } from '@/components/ui/input';
import { GetRevenueResult } from '../../_lib/revenue.type';
import { columns } from './revenue-column';
import { RevenueDataTable } from './revenue-data-table';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

interface RevenueTableProps {
  allRevenues: GetRevenueResult[];
}

const RevenueTable = ({ allRevenues }: RevenueTableProps) => {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // cegah reload page
    // redirect ke /revenue?q=search
    router.push(`revenue?q=${encodeURIComponent(search)}`);
  };
  return (
    <div className="space-y-4">
      <div>
        <form onSubmit={handleSubmit} className="flex items-center gap-1">
          <Input
            placeholder="e.g : Pendapatan retribusi"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button type="submit">
            <Search />
            Search
          </Button>
        </form>
      </div>
      <RevenueDataTable columns={columns} data={allRevenues} />
    </div>
  );
};

export default RevenueTable;
