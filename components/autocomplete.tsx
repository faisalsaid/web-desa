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

type AutocompleteProps<T> = {
  label?: string;
  placeholder?: string;
  value: any;
  onChange: (value: any) => void;

  // async fetcher
  search: (query: string) => Promise<T[]>;

  // display text in input
  displayValue: (item: T | null) => string;

  // identity key
  getKey: (item: T) => string | number;

  // how each item is rendered
  renderItem?: (item: T) => React.ReactNode;

  // minimum characters before triggering search
  minLength?: number;
};

export function Autocomplete<T>({
  label,
  placeholder,
  value,
  onChange,
  search,
  displayValue,
  renderItem,
  getKey,
  minLength = 3,
}: AutocompleteProps<T>) {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [open, setOpen] = useState(false);

  const searchTimeout = useRef<any>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Update input when external value changes (e.g. form reset)
  useEffect(() => {
    if (!value) {
      setInput('');
      return;
    }
  }, [value]);

  async function runSearch(q: string) {
    if (q.trim().length < minLength) {
      setResults([]);
      setOpen(false);
      return;
    }

    // cancel previous request
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

    searchTimeout.current = setTimeout(() => {
      runSearch(q);
    }, 250);
  }

  function selectItem(item: T) {
    onChange(getKey(item)); // return actual key / id
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
            onFocus={() => results.length && setOpen(true)}
          />

          {open && (
            <CommandList className="absolute left-0 w-full top-12 z-50 bg-white shadow-lg rounded-md border">
              <CommandEmpty>Tidak ada hasil</CommandEmpty>
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
