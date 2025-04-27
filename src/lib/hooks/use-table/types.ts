import {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
} from '@tanstack/react-table';

export interface useTableProps<TData, TValue> {
  /**
   * The data to display in the table
   * */
  data: TData[];
  /**
   * The columns to display in the table
   * */
  columns: ColumnDef<TData, TValue>[];
  /**
   * The sorting state of the table
   * */
  sorting?: SortingState;
  /**
   * The key to store the column visibility in local storage
   * */
  tableKey?: string;
  rowSelection?: RowSelectionState;
  columnFilters?: ColumnFiltersState;
  enablePageParams?: boolean;
  enableSortParams?: boolean;
  manualSorting?: boolean;
  manualPagination?: boolean;
  pagination?: PaginationState;
  totalCount?: number;
  enableRowSelection?: boolean;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  onSortingChange?: OnChangeFn<SortingState>;
  onPaginationChange?: OnChangeFn<PaginationState>;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
}
