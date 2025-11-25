'use client';

import { FC, FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface RevenueSearchFormProps {
  defaultSearch?: string;
  onSearch: (value: string) => void;
  placeholder?: string;
}

export const TableSearchForm: FC<RevenueSearchFormProps> = ({
  defaultSearch = '',
  placeholder = 'Cari...',
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
        className="bg-background text-sm"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button type="submit">
        <Search />

        <span className="hidden sm:block">Search</span>
      </Button>
    </form>
  );
};
