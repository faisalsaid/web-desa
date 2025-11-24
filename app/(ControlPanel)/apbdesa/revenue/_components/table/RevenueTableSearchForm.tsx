'use client';

import { FC, FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface RevenueSearchFormProps {
  defaultSearch?: string;
  onSearch: (value: string) => void;
}

export const RevenueTableSearchForm: FC<RevenueSearchFormProps> = ({
  defaultSearch = '',
  onSearch,
}) => {
  const [search, setSearch] = useState(defaultSearch);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-1">
      <Input
        className="bg-background"
        placeholder="e.g : Pendapatan retribusi"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button type="submit">
        <Search />
        Search
      </Button>
    </form>
  );
};
