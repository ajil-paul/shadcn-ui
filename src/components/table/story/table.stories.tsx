import React, { useState } from 'react';

import { MemoryRouter } from 'react-router-dom';

import { useTable } from '@lib/hooks/use-table';
import type { Meta } from '@storybook/react';
import { RowSelectionState } from '@tanstack/react-table';

import { Table, TableProps, ViewOptions } from '..';
import { columns } from './columns';
import { TASKS } from './data';
import { stringifyArrayOfObjects } from './utils';

const meta = {
  title: 'Components/Table',
  component: Table as React.ComponentType<TableProps>,
  subcomponents: {},
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<TableProps>;

meta.subcomponents = {
  Table,
};

export default meta;

export const Default = (args: TableProps) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useTable({
    data: TASKS,
    totalCount: TASKS.length,
    columns,
    rowSelection,
    enablePageParams: true,
    enableSortParams: true,
    enableRowSelection: true,
    // autoResetPageIndex: false,
    setRowSelection: setRowSelection,
    setColumnFilters: () => {},
  });

  return (
    <div className="flex flex-col w-full p-2 space-y-2">
      <div className="flex items-center justify-end w-full space-x-2">
        <ViewOptions table={table} />
      </div>
      <div className="flex flex-col w-full space-y-2 overflow-y-auto text-sm pb-7 h-96">
        <Table {...args} table={table} />
      </div>
    </div>
  );
};

Default.args = { sizeOptions: [10, 20, 50] };

Default.parameters = {
  docs: {
    source: {
      code: `
import { useState } from "react";
import { RowSelectionState } from "@tanstack/react-table";

import { useTable } from "@shad-ui/hooks";
import Table from "@shad-ui";

const DefaultTable = () => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const tasks = [
${stringifyArrayOfObjects(TASKS.slice(0, 20), 4)}
  ];

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
    {
      accessorKey: "id",
      header: ({ column }) => <Header column={column} title="Task" />,
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      name: "Title",
      header: ({ column }) => <Header column={column} title="Title" />,
      cell: ({ row }) => {
        const label = labels.find((label) => label.value === row.original.label);

        return (
          <div className="flex space-x-2">
            {label && <Badge variant="outline">{label.label}</Badge>}
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("title")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      name: "Status",
      header: ({ column }) => <Header column={column} title="Status" />,
      cell: ({ row }) => {
        const status = statuses.find(
          (status) => status.value === row.getValue("status")
        );

        if (!status) {
          return null;
        }

        return (
          <div className="flex w-[100px] items-center">
            {status.icon && (
              <status.icon className="w-4 h-4 mr-2 text-muted-foreground" />
            )}
            <span>{status.label}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "priority",
      name: "Priority",
      header: ({ column }) => <Header column={column} title="Priority" />,
      cell: ({ row }) => {
        const priority = priorities.find(
          (priority) => priority.value === row.getValue("priority")
        );

        if (!priority) {
          return null;
        }

        return (
          <div className="flex items-center">
            {priority.icon && (
              <priority.icon className="w-4 h-4 mr-2 text-muted-foreground" />
            )}
            <span>{priority.label}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => <RowActions row={row} />,
    },
  ]

  const table = useTable({
    data: tasks,
    columns,
    pagination: {
      sizeOptions: [10, 20, 50],
      totalCount: tasks.length,
    },
    rowSelection,
    enablePageParams: true,
    enableRowSelection: true,
    setRowSelection: setRowSelection,
    setColumnFilters: () => {},
  });

  return (
    <div className="flex flex-col w-full p-2 overflow-y-auto text-sm pb-7 h-96">
      <Table sizeOptions={[10, 20, 50]} table={table} />
    </div>
  );
};
`,
    },
  },
};
