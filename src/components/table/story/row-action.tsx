import React from 'react';

import { MoreHorizontal } from 'lucide-react';

import { showAlert } from '@components/alert';
import { Button } from '@components/button';
import { Dropdown } from '@components/dropdown';
import { Row } from '@tanstack/react-table';

interface RowActionsProps<TData> {
  row: Row<TData>;
}

export function RowActions<TData>({ row }: RowActionsProps<TData>) {
  const handleDelete = () =>
    showAlert({
      title: 'Delete record?',
      description: `Are you sure that you want to delete the task with title : ${row.original?.title}`,
    });

  return (
    <Dropdown
      menuClassName="w-40"
      align="end"
      menuList={[
        { title: 'Edit', key: 'edit' },
        { title: 'Make a copy', key: 'make_copy' },
        { title: 'Favorite', key: 'favorite' },

        { type: 'separator', key: 'separator' },
        {
          title: 'Delete',
          shortcut: '⌘⌫',
          danger: true,
          key: 'delete',
          onClick: handleDelete,
        },
      ]}
    >
      <Button
        variant="ghost"
        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        icon={MoreHorizontal}
        label={<span className="sr-only">Open menu</span>}
      />
    </Dropdown>
  );
}
