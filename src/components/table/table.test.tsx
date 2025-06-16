// Table.test.tsx
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Table } from './table';
import { Pagination } from './pagination';

const createMockTable = (overrides = {}) => {
  const rows = [
    ...Array(25)
      .fill(null)
      .map((_el, index) => ({
        id: `row${index}`,
        getIsSelected: () => false,
        getVisibleCells: () => [
          {
            id: `cell${index}`,
            column: { columnDef: { cell: () => `Cell ${index}` } },
            getContext: vi.fn(() => ({})),
          },
        ],
      })),
  ];
  return {
    getState: () => ({
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    }),
    getPageCount: () => 5,
    getCanPreviousPage: () => true,
    getCanNextPage: () => true,
    previousPage: vi.fn(),
    nextPage: vi.fn(),
    setPageIndex: vi.fn(),
    setPageSize: vi.fn(),
    getAllColumns: vi.fn(() => [{ id: 'col1' }, { id: 'col2' }]),
    getHeaderGroups: vi.fn(() => [
      {
        id: 'headerGroup1',
        headers: [
          {
            id: 'col1',
            isPlaceholder: false,
            column: {
              columnDef: {
                header: () => 'Header 1',
              },
            },
            getContext: vi.fn(() => ({})),
          },
        ],
      },
    ]),
    getRowModel: vi.fn(() => ({ rows })),
    getFilteredSelectedRowModel: vi.fn(() => ({ rows: [] })),
    getFilteredRowModel: vi.fn(() => ({ rows })),
    ...overrides,
  };
};

describe('Table', () => {
  let tableMock: ReturnType<typeof createMockTable>;

  beforeEach(() => {
    tableMock = createMockTable();
  });

  it('renders headers and rows', () => {
    render(<Table table={tableMock} sizeOptions={[10, 20]} />);
    expect(screen.getByText('Header 1')).toBeInTheDocument();
    expect(screen.getByText('Cell 1')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    render(<Table table={tableMock} sizeOptions={[10]} isLoading={true} />);
    expect(screen.getByTestId('table-loader')).toBeInTheDocument();
  });

  it('renders "No results" when there are no rows', () => {
    const tableWithNoRows = createMockTable({
      getRowModel: () => ({ rows: [] }),
    });

    render(<Table table={tableWithNoRows} sizeOptions={[10]} />);
    expect(screen.getByText('No results.')).toBeInTheDocument();
  });

  it('renders pagination info', () => {
    render(<Table table={tableMock} sizeOptions={[10]} />);
    expect(screen.getByText(/0 of 25 row\(s\) selected/i)).toBeInTheDocument();
  });
});

describe('Pagination Component', () => {
  it('renders pagination controls', () => {
    const table = createMockTable();
    render(<Pagination table={table} sizeOptions={[5, 10, 25]} />);

    // Check rows per page label
    expect(screen.getByText('Rows per page')).toBeInTheDocument();

    // Check for previous/next buttons
    expect(screen.getByTestId('previous-button')).toBeInTheDocument();
    expect(screen.getByTestId('next-button')).toBeInTheDocument();

    // Check for current page button
    expect(screen.getByText('2')).toBeInTheDocument(); // index 1 + 1
  });

  it('calls nextPage and previousPage when buttons are clicked', async () => {
    const table = createMockTable();
    render(<Pagination table={table} />);

    const prevButton = screen.getByTestId('previous-button');
    const nextButton = screen.getByTestId('next-button');

    fireEvent.click(prevButton);
    fireEvent.click(nextButton);

    expect(table.previousPage).toHaveBeenCalled();
    expect(table.nextPage).toHaveBeenCalled();
  });

  it('changes the page size when selected', () => {
    const setPageSize = vi.fn();
    const table = createMockTable({ setPageSize });

    render(<Pagination table={table} sizeOptions={[5, 10, 25]} />);

    // Open the dropdown
    const currentOption = screen.getByText('10'); // Assuming initial pageSize is 10
    fireEvent.mouseDown(currentOption); // or fireEvent.click() if that's what your component uses

    // Select a different option
    const newOption = screen.getByText('25');
    fireEvent.click(newOption);

    expect(setPageSize).toHaveBeenCalledWith(25);
  });

  it('navigates to correct page when a page number is clicked', () => {
    const table = createMockTable();
    render(<Pagination table={table} />);

    const page3Button = screen.getByText('3'); // pageIndex 2
    fireEvent.click(page3Button);

    expect(table.setPageIndex).toHaveBeenCalledWith(2);
  });

  it('does not respond when "..." is clicked', () => {
    const table = createMockTable({
      getPageCount: () => 15,
      getState: () => ({
        pagination: {
          pageIndex: 7,
          pageSize: 10,
        },
      }),
    });

    render(<Pagination table={table} />);

    const dots = screen.getAllByText('...')[0];
    fireEvent.click(dots);

    expect(table.setPageIndex).not.toHaveBeenCalled();
  });
});
