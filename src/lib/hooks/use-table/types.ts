import {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  Updater,
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
  enableParams?: boolean;
  manualSorting?: boolean;
  pagination?: {
    pageSize?: number;
    pageIndex?: number;
    totalCount: number;
    sizeOptions?: number[];
    manualPagination?: boolean;
    onChange?: (updater: Updater<PaginationState>) => void;
  };
  enableRowSelection?: boolean;
  setRowSelection?: OnChangeFn<RowSelectionState>;
  setSorting?: OnChangeFn<SortingState>;
  setColumnFilters?: OnChangeFn<ColumnFiltersState>;
}
