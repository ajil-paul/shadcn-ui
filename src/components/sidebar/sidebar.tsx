import React from 'react';

import { SidebarClose, SidebarOpen } from 'lucide-react';
import { omit } from 'ramda';

import {
  Sidebar as ShadUISidebar,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  useSidebar,
} from '@base/sidebar';
import { Button } from '@components/button';
import { cn } from '@lib/utils';

import { MenuSection } from './menu-section';
import { SidebarProps } from './types';

export const Sidebar = ({
  header,
  menuSections = [],
  footerMenuSections = [],
  variant = 'inset',
  footer,
  style,
  className,
  defaultOpen = true,
  defaultMobileOpen = false,
  ...props
}: SidebarProps) => {
  const sidebarContext = useSidebar({ defaultOpen, defaultMobileOpen });

  return (
    <div
      style={
        {
          '--sidebar-width': SIDEBAR_WIDTH,
          '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        'group/sidebar-wrapper flex min-h-svh has-[[data-variant=inset]]:bg-sidebar',
        className
      )}
      {...props}
    >
      <ShadUISidebar
        {...omit(['toggleSidebar'], sidebarContext)}
        variant={variant}
      >
        {!!header && (
          <SidebarHeader>
            <SidebarMenuButton asChild className="w-full h-auto">
              <div className="w-full">{header}</div>
            </SidebarMenuButton>
          </SidebarHeader>
        )}
        <SidebarContent>
          {menuSections.map(({ items, title, className, key }) => (
            <MenuSection key={key} {...{ items, title, className }} />
          ))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarContent>
            {footerMenuSections.map(({ items, title, className, key }) => (
              <MenuSection key={key} {...{ items, title, className }} />
            ))}
          </SidebarContent>
          {footer}
        </SidebarFooter>
        <Button
          data-testid="toggle-sidebar"
          icon={
            sidebarContext.open ? (
              <SidebarClose
                strokeWidth={1.5}
                size={22}
                className="text-muted-foreground"
              />
            ) : (
              <SidebarOpen
                strokeWidth={1.5}
                size={22}
                className="text-muted-foreground"
              />
            )
          }
          variant={sidebarContext.isMobile ? 'secondary' : 'ghost'}
          onClick={sidebarContext.toggleSidebar}
          className="absolute px-2 top-4 -right-12"
        />
      </ShadUISidebar>
      {sidebarContext.isMobile && !sidebarContext.mobileOpen && (
        <div className="absolute p-2 pt-4">
          <Button
            icon={
              <SidebarOpen
                strokeWidth={1.5}
                size={22}
                className="text-muted-foreground"
              />
            }
            variant="ghost"
            onClick={sidebarContext.toggleSidebar}
            className="px-2"
          />
        </div>
      )}
    </div>
  );
};
