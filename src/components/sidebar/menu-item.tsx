import React from 'react';

import { ChevronRight } from 'lucide-react';
import { any, isEmpty } from 'ramda';
import { Link, useLocation } from 'react-router-dom';

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

import { LinkComponentProps, MenuItemProps } from './types';

const LinkComponent = ({
  to,
  href,
  children,
  ...otherProps
}: LinkComponentProps) => {
  if (to)
    return (
      <Link {...otherProps} to={to}>
        {children}
      </Link>
    );

  if (href)
    return (
      <a {...otherProps} href={href} target="_blank">
        {children}
      </a>
    );

  return <span {...otherProps}>{children}</span>;
};

export const MenuItem = (props: MenuItemProps) => {
  const { pathname } = useLocation();

  const { children, size, icon, title, path, href } = props;

  const isActive = props.isActive || pathname === path;

  if (!children || isEmpty(children))
    return (
      <SidebarMenuButton isActive={isActive} size={size} asChild>
        <LinkComponent to={path} href={href}>
          {renderIcon(icon)}
          <span>{title}</span>
        </LinkComponent>
      </SidebarMenuButton>
    );

  const checkIsActive = (item: MenuItemProps): boolean =>
    item.isActive || pathname === item.path;

  const checkIsCollapsed = (item: MenuItemProps): boolean => {
    if (!item.children?.length) return checkIsActive(item);
    else return any((item) => !!item && checkIsCollapsed(item), item.children);
  };

  return (
    <Collapsible
      asChild
      defaultOpen={checkIsCollapsed(props)}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton isActive={checkIsActive(props)} size={size}>
            {renderIcon(icon)}
            <span>{title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {children?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.key}>
                <SidebarMenuSubButton isActive={checkIsActive(subItem)} asChild>
                  <LinkComponent to={subItem.path} href={subItem.href}>
                    <span>{subItem.title}</span>
                  </LinkComponent>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};
