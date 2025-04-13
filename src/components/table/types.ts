import { Table } from '@tanstack/react-table';

export interface PaginationProps<TData> {
  table: Table<TData>;
  sizeOptions?: number[];
}

export interface TableProps {
  /**
   * The size options for the table.
   */
  sizeOptions?: number[];
  /**
   * The table instance to render.
   */
  table: Table<any>;
  /**
   * Whether the table is loading.
   */
  isLoading?: boolean;
}
