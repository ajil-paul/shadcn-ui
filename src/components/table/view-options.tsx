import React from 'react';

import { Settings2 } from 'lucide-react';

import { Button } from '@components/button';
import { Dropdown } from '@components/dropdown';
import { humanize } from '@lib/utils';
import { Table } from '@tanstack/react-table';

interface ViewOptionsProps<TData> {
  table: Table<TData>;
}

export const ViewOptions = <TData,>({ table }: ViewOptionsProps<TData>) => {
  return (
    <Dropdown
      align="end"
      menuClassName="w-[150px]"
      menuList={[
        { key: 'toggle', type: 'label', title: 'Toggle columns' },
        { key: 'separator-1', type: 'separator' },
        ...table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map((column) => ({
            type: 'checkbox',
            key: column.id,
            checked: column.getIsVisible(),
            onCheckedChange: (value: boolean) => {
              column.toggleVisibility(!!value);
            },
            title: humanize(column.id),
          })),
      ]}
    >
      <Button
        variant="outline"
        size="sm"
        className="h-8 ml-auto lg:flex"
        icon={Settings2}
        label="View"
      />
    </Dropdown>
  );
};
