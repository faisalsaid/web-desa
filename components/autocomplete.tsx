// ===========================
// Autocomplete.tsx (Final)
// ===========================
'use client';

import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
} from '@/components/ui/command';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useEffect, useRef, useState } from 'react';

// Autocomplete generik final
export type AutocompleteProps<T> = {
  label?: string;
  placeholder?: string;

  /** item terpilih */
  value: T | null;
  onChange: (value: T | null) => void;

  /** fungsi pencarian */
  search: (query: string) => Promise<T[]>;

  /** cara menampilkan text */
  displayValue: (item: T | null) => string;

  /** key unik */
  getKey: (item: T) => string | number;

  /** custom render */
  renderItem?: (item: T) => React.ReactNode;

  minLength?: number;

  disabled?: boolean;
};

export function Autocomplete<T>({
  label,
  placeholder,
  value,
  onChange,
  search,
  displayValue,
  getKey,
  renderItem,
  minLength = 2,
  disabled,
}: AutocompleteProps<T>) {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [open, setOpen] = useState(false);

  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Prefill jika value berubah
  useEffect(() => {
    if (value) setInput(displayValue(value));
    else setInput('');
  }, [value, displayValue]);

  async function runSearch(q: string) {
    if (q.trim().length < minLength) {
      setResults([]);
      setOpen(false);
      return;
    }

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const items = await search(q);
      setResults(items);
      setOpen(true);
    } catch {}
  }

  function handleInputChange(q: string) {
    setInput(q);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => runSearch(q), 200);
  }

  function selectItem(item: T) {
    onChange(item);
    setInput(displayValue(item));
    setOpen(false);
  }

  return (
    <FormItem className="relative">
      {label && <FormLabel>{label}</FormLabel>}

      <FormControl>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            value={input}
            onValueChange={(q) => handleInputChange(q)}
            onFocus={() => results.length > 0 && setOpen(true)}
            disabled={disabled}
          />

          {open && (
            <CommandList className="absolute left-0 top-12 w-full bg-white shadow-md rounded-md border z-50">
              <CommandEmpty>
                <span className="text-red-500">Ups! Tidak ada hasil</span>
              </CommandEmpty>
              <CommandGroup>
                {results.map((item) => (
                  <CommandItem
                    key={getKey(item)}
                    onSelect={() => selectItem(item)}
                  >
                    {renderItem ? renderItem(item) : displayValue(item)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </FormControl>

      <FormMessage />
    </FormItem>
  );
}
