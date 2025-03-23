import React from 'react';

import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from '@base/sidebar';

import { MenuItem } from './menu-item';
import { MenuSectionProps } from './types';

export const MenuSection = ({
  title,
  items = [],
  className = '',
}: MenuSectionProps) => {
  return (
    <SidebarGroup className={className}>
      {!!title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map(({ key, ...item }) => (
          <MenuItem key={key} {...item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
