'use client';

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { FamiliesDataTableType } from '../_lib/families.type';

interface FamilyDataTableProps {
  columns: ColumnDef<FamiliesDataTableType, any>[];
  data: FamiliesDataTableType[];
  page: number;
  totalPages: number;
  pageSize: number;
}

export const FamilyDataTable = ({
  columns,
  data,
  page,
  totalPages,
  pageSize,
}: FamilyDataTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const router = useRouter();

  const handleChangePageSize = (size: number) => {
    router.push(`/families?page=1&pageSize=${size}`);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination & PageSize */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <span>Per halaman:</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(val) => handleChangePageSize(Number(val))}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 items-center">
          <Button
            disabled={page <= 1}
            onClick={() =>
              router.push(`/families?page=${page - 1}&pageSize=${pageSize}`)
            }
          >
            Previous
          </Button>

          <span>
            Halaman {page} dari {totalPages}
          </span>

          <Button
            disabled={page >= totalPages}
            onClick={() =>
              router.push(`/families?page=${page + 1}&pageSize=${pageSize}`)
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
