import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@base/dropdown-menu';
import { cn } from '@lib/utils';

import { DropdownItem } from './dropdown-item';
import { DropdownProps } from './types';

export const Dropdown = ({
  children,
  side,
  menuClassName = '',
  menuList = [],
  sideOffset,
  align,
}: DropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
    <DropdownMenuContent
      side={side}
      sideOffset={sideOffset}
      align={align}
      className={cn('w-56', menuClassName)}
    >
      {menuList.map(({ key, ...item }) => (
        <DropdownItem key={key} {...item} />
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);
