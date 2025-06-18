import React, { useMemo, useRef } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import { Checkbox } from '@components/checkbox';
import {
  ColumnDef,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { useTableProps } from './types';
import { useLocalStorage } from '../useLocalStorage';

export const useTable = <TData, TValue>({
  data,
  columns,
  sorting,
  tableKey,
  rowSelection,
  columnFilters,
  totalCount,
  pagination,
  manualPagination = false,
  manualSorting = false,
  enableRowSelection = true,
  enableSortParams = false,
  enablePageParams = false,
  onRowSelectionChange,
  onSortingChange,
  onColumnFiltersChange,
  onPaginationChange,
  ...otherProps
}: useTableProps<TData, TValue>) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const defaultKeyRef = useRef(`table-column-visibility-${v4()}`);
  const [columnVisibility, setColumnVisibility] = useLocalStorage(
    tableKey || defaultKeyRef.current,
    {}
  );
  const urlSearchParams = useMemo(() => new URLSearchParams(search), [search]);

  const columnData: ColumnDef<any, any>[] = useMemo(() => {
    if (enableRowSelection) {
      return [
        {
          id: 'select',
          header: ({ table }) => (
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && 'indeterminate')
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
              className="translate-y-[2px]"
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
              className="translate-y-[2px]"
            />
          ),
          enableSorting: false,
          enableHiding: false,
        },
        ...columns,
      ];
    }
    return columns;
  }, [columns, enableRowSelection]);

  const paginationProps = useMemo(() => {
    if (!enablePageParams) return pagination;

    return {
      pageIndex: Number(Number(urlSearchParams.get('pageIndex'))) || 0,
      pageSize:
        Number(urlSearchParams.get('pageSize')) || pagination?.pageSize || 10,
    };
  }, [search, pagination?.pageIndex, pagination?.pageSize, enablePageParams]);

  const sortingProps = useMemo(() => {
    if (enableSortParams) {
      const orderBy = urlSearchParams.get('orderBy');
      const order = urlSearchParams.get('order') || 'asc';
      return orderBy ? [{ id: orderBy, desc: order === 'desc' }] : sorting;
    }
    return sorting;
  }, [search, sorting, enableSortParams]);

  const handlePagination: OnChangeFn<PaginationState> = (updaterOrValue) => {
    const newState =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(table.getState().pagination)
        : updaterOrValue;
    if (enablePageParams) {
      const newSearch = new URLSearchParams(search);
      newSearch.set('pageIndex', newState.pageIndex.toString());
      newSearch.set('pageSize', newState.pageSize.toString());
      navigate(`${pathname}?${newSearch.toString()}`);
    } else onPaginationChange?.(newState);
  };

  const handleSorting: OnChangeFn<SortingState> = (updater) => {
    const updatedSorting =
      typeof updater === 'function' ? updater([]) : updater;
    if (enableSortParams && updatedSorting.length > 0) {
      const newSearch = new URLSearchParams(search);
      newSearch.delete('pageIndex');
      newSearch.delete('pageSize');
      newSearch.set('orderBy', updatedSorting[0]?.id);
      newSearch.set('order', updatedSorting[0]?.desc ? 'desc' : 'asc');
      navigate(`${pathname}?${newSearch.toString()}`);
    } else onSortingChange?.(updatedSorting);
  };

  const table = useReactTable({
    data,
    columns: columnData as ColumnDef<unknown, any>[],
    state: {
      columnVisibility,
      rowSelection: rowSelection || {},
      columnFilters,
      sorting: sortingProps,
      pagination: paginationProps,
    },
    autoResetPageIndex: false,
    manualSorting,
    manualPagination,
    rowCount: totalCount || data.length,
    enableRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onRowSelectionChange: onRowSelectionChange,
    onColumnFiltersChange: onColumnFiltersChange,
    onPaginationChange: handlePagination,
    onSortingChange: handleSorting,
    ...otherProps,
  });

  return table;
};
