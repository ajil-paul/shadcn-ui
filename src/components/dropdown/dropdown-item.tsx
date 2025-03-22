import React from 'react';

import clsx from 'clsx';
import { isEmpty } from 'ramda';

import {
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@base/dropdown-menu';
import { renderIcon } from '@lib/utils';

import { DropdownItemProps } from './types';

export const DropdownItem = ({
  type = 'item',
  title = '',
  shortcut = '',
  children = [],
  checked = false,
  danger = false,
  icon,
  render,
  ...otherProps
}: DropdownItemProps) => {
  if (render) return render();

  if (type === 'label') return <DropdownMenuLabel>{title}</DropdownMenuLabel>;

  if (type === 'separator') return <DropdownMenuSeparator />;

  if (type === 'checkbox')
    return (
      <DropdownMenuCheckboxItem checked={checked} {...otherProps}>
        {title}
      </DropdownMenuCheckboxItem>
    );

  if (isEmpty(children))
    return (
      <DropdownMenuItem
        {...otherProps}
        className={clsx({ 'text-destructive focus:text-destructive': danger })}
      >
        <div className="flex items-center gap-x-2">
          {renderIcon(icon)}
          {title}
        </div>
        {shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
      </DropdownMenuItem>
    );

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger {...otherProps}>{title}</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {children.map(({ key, ...item }) => (
            <DropdownItem key={key} {...item} />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};
