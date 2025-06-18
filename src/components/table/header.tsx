import React from 'react';

import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from 'lucide-react';

import { TableHead } from '@base/table';
import { Button } from '@components/button';
import { Dropdown } from '@components/dropdown';
import { flexRender, Header as HeaderProps } from '@tanstack/react-table';

export const Header = <TData, TValue>({
  column,
  colSpan,
  getContext,
}: HeaderProps<TData, TValue>) => {
  const renderedHeader = flexRender(column.columnDef.header, getContext());

  if (!column.columnDef.enableSorting)
    return <TableHead colSpan={colSpan}>{renderedHeader}</TableHead>;

  return (
    <TableHead colSpan={colSpan}>
      <Dropdown
        menuClassName="w-28"
        menuList={[
          {
            key: 'sort-asc',
            title: 'Asc',
            icon: <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />,
            onClick: () => column.toggleSorting(false),
          },
          {
            key: 'sort-desc',
            title: 'Desc',
            icon: (
              <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
            ),
            onClick: () => column.toggleSorting(true),
          },
          { key: 'separator-1', type: 'separator' },
          {
            key: 'hide',
            title: 'Hide',
            icon: <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />,
            onClick: () => column.toggleVisibility(false),
          },
        ]}
      >
        <Button
          variant="ghost"
          size="sm"
          className="h-8 data-[state=open]:bg-accent flex"
          label={renderedHeader}
          icon={
            column.getIsSorted() === 'desc'
              ? ArrowDown
              : column.getIsSorted() === 'asc'
                ? ArrowUp
                : ChevronsUpDown
          }
          iconPosition="right"
        />
      </Dropdown>
    </TableHead>
  );
};

export default Header;
