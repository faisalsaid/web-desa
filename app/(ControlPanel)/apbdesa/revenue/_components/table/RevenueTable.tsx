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
  totalPages: number;
  currentPage: number;
  search?: string;
}
const RevenueTable = ({
  allRevenues,
  totalPages,
  currentPage,
  search: defaultSearch = '',
}: RevenueTableProps) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>(defaultSearch);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // cegah reload page
    // redirect ke /revenue?q=search
    router.push(`revenue?q=${encodeURIComponent(search)}`);
  };

  const goToPage = (page: number) => {
    router.push(`revenue?q=${encodeURIComponent(search)}&page=${page}`);
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-2">
          <Button
            disabled={currentPage <= 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            Prev
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? 'default' : 'outline'}
              onClick={() => goToPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            disabled={currentPage >= totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default RevenueTable;
