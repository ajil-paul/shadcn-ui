import React from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { isNotEmpty } from 'ramda';

import { Button } from '@components/button';
import { Select } from '@components/select';
import { cn } from '@lib/utils';

import { PaginationProps } from './types';

export const Pagination = <TData,>({
  table,
  sizeOptions,
}: PaginationProps<TData>) => {
  const { pageIndex, pageSize } = table.getState().pagination;

  const pageCount = table.getPageCount();

  const getPageButtons = () => {
    const buttons = [];

    if (pageCount <= 7) for (let i = 0; i < pageCount; i++) buttons.push(i);
    else {
      buttons.push(0);
      if (pageIndex > 3) buttons.push('...');
      for (
        let i = Math.max(pageIndex - 2, 1);
        i <= Math.min(pageIndex + 2, pageCount - 2);
        i++
      )
        buttons.push(i);

      if (pageIndex < pageCount - 4) buttons.push('...');
      buttons.push(pageCount - 1);
    }

    return buttons;
  };

  const pages = getPageButtons();

  return (
    <div className="flex max-w-full space-x-4">
      {sizeOptions && isNotEmpty(sizeOptions) && (
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            strategy="fixed"
            menuPlacement="top"
            value={pageSize}
            onChange={(value) => {
              table.setPageSize(Number(value));
            }}
            options={sizeOptions.map((pageSize: number) => ({
              value: pageSize,
              label: pageSize,
            }))}
          />
        </div>
      )}

      {table.getFilteredRowModel().rows.length > pageSize && (
        <nav
          aria-label="Pagination"
          className="inline-flex -space-x-px rounded-md shadow-sm h-9"
        >
          <Button
            variant="outline"
            className="justify-center h-full p-0 rounded-r-none w-9"
            data-testid="previous-button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            icon={ChevronLeft}
            label={<span className="sr-only">Go to previous page</span>}
          />

          {pages.map((page, index) => (
            <button
              key={index}
              onClick={() =>
                typeof page === 'number' && table.setPageIndex(page)
              }
              aria-current={pageIndex === page ? 'page' : undefined}
              disabled={page === '...'}
              className={cn({
                'relative h-full flex items-center px-4 py-2 text-sm font-semibold border':
                  true,
                'z-10 bg-primary text-primary-foreground border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2':
                  pageIndex === page,
                'text-foreground hover:bg-accent': pageIndex !== page,
                'cursor-default': page === '...',
              })}
            >
              {typeof page === 'number' ? page + 1 : page}
            </button>
          ))}

          <Button
            variant="outline"
            className="justify-center h-full p-0 rounded-l-none w-9"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            data-testid="next-button"
            icon={ChevronRight}
            label={<span className="sr-only">Go to next page</span>}
          />
        </nav>
      )}
    </div>
  );
};
