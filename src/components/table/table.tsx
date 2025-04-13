import React from 'react';

import { Loader } from 'lucide-react';
import { isEmpty } from 'ramda';

import {
  Table as ShadUITable,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@base/table';
import { cn } from '@lib/utils';
import { flexRender, Header as HeaderProps } from '@tanstack/react-table';

import { Header } from './header';
import { Pagination } from './pagination';
import { TableProps } from './types';

export const Table = ({
  table,
  sizeOptions,
  isLoading = false,
}: TableProps) => {
  const columns = table.getAllColumns();

  if (isEmpty(columns)) return null;

  return (
    <div
      className={cn('relative flex flex-col w-full max-h-full space-y-4', {
        'pointer-events-none select-none': isLoading,
      })}
    >
      <div className="relative flex w-full h-full overflow-auto border rounded-md">
        <ShadUITable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="sticky top-0 z-10 bg-opacity-100 shadow-sm bg-background hover:bg-background"
              >
                {headerGroup.headers.map((header: HeaderProps<any, any>) => {
                  return header.isPlaceholder ? null : (
                    <Header key={header.id} {...header} />
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </ShadUITable>
      </div>
      <div className="flex items-center justify-between px-4">
        <div className="flex text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Pagination table={table} sizeOptions={sizeOptions} />
      </div>
      {isLoading && (
        <div
          data-testid="table-loader"
          className="absolute inset-0 z-10 flex items-center justify-center bg-opacity-50 bg-background"
        >
          <Loader className="animate-spin" size={20} />
        </div>
      )}
    </div>
  );
};
