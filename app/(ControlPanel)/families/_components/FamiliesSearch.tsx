'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fetchFamilies } from '../_lib/families.actions';
import { FamilyDataTable } from './families-data-table';
import { familyColumns } from './families-columns';
import { FamiliesDataTableType } from '../_lib/families.type';

export function FamiliesSearch({
  initialData,
  initialPage = 1,
  initialPageSize = 10,
}: {
  initialData: FamiliesDataTableType[];
  initialPage?: number;
  initialPageSize?: number;
}) {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async () => {
    const res = await fetchFamilies({ page, pageSize, search });
    if (res.success) {
      setData(res.data ?? []);
      setTotalPages(res.total ? Math.ceil(res.total / pageSize) : 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center mb-4">
        <Input
          placeholder="Cari Nomor KK..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
        <Button onClick={handleSearch}>Cari</Button>
      </div>

      <FamilyDataTable
        columns={familyColumns}
        data={data}
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
      />
    </div>
  );
}
