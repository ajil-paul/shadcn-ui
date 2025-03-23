import React from 'react';

import { ChevronRight } from 'lucide-react';
import { isEmpty } from 'ramda';
import { Link } from 'react-router-dom';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@base/collapsible';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@base/sidebar';
import { renderIcon } from '@lib/utils';

import { MenuItemProps } from './types';

export const MenuItem = ({
  children,
  size,
  icon,
  title,
  path,
  isActive,
}: MenuItemProps) => {
  if (!children || isEmpty(children))
    return (
      <SidebarMenuButton size={size} asChild>
        <a href={path}>
          {renderIcon(icon)}
          <span>{title}</span>
        </a>
      </SidebarMenuButton>
    );

  return (
    <Collapsible asChild defaultOpen={isActive} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton size={size}>
            {!!icon ? renderIcon(icon) : null}
            <span>{title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {children?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.key}>
                <SidebarMenuSubButton asChild>
                  <Link to={subItem.path}>
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};
