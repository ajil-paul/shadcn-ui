import React from 'react';

import { Sidebar } from '@base/sidebar';
import { Button } from '@components/button';

export interface MenuItemProps {
  /**
   * A unique key for the menu item.
   */
  key: string | number;

  /**
   * The title of the menu item.
   */
  title: string;

  /**
   * The path to navigate to when the menu item is clicked.
   */
  path?: string;

  /**
   * To provide external link
   */
  href?: string;

  /**
   * An icon to be displayed alongside the menu item.
   */
  icon?: React.ElementType | React.ReactNode;

  /**
   * The size of the menu item.
   * Can be "sm" for small or "default" for regular size.
   */
  size?: 'sm' | 'default';

  /**
   * Indicates whether the menu item is currently active.
   */
  isActive?: boolean;

  /**
   * A list of child menu items.
   */
  children?: MenuItemProps[];
}

export interface MenuSectionProps {
  /**
   * A unique key for the menu section.
   */
  key: string | number;

  /**
   * The title of the menu section.
   */
  title?: string;

  /**
   * Additional class names for the menu section.
   */
  className?: string;

  /**
   * A list of menu items within the section.
   */
  items: MenuItemProps[];
}

export interface SidebarProps extends React.ComponentProps<typeof Sidebar> {
  /**
   * Indicates whether the sidebar should be open by default.
   */
  defaultOpen?: boolean;

  /**
   * The variant of the sidebar.
   * Can be "inset", "sidebar", or "floating".
   */
  variant?: 'inset' | 'sidebar' | 'floating';

  /**
   * The component to be displayed in the header section of the sidebar.
   */
  header?: React.ReactElement;

  /**
   * A list of menu sections to be displayed in the sidebar.
   */
  menuSections: MenuSectionProps[];

  /**
   * A list of menu sections to be displayed in the footer section.
   */
  footerMenuSections?: MenuSectionProps[];

  /**
   * The footer content to be displayed in the sidebar.
   */
  footer: React.ReactNode;

  /**
   * To override the className for the wrapper div
   */
  className?: string;
}

export interface SidebarTriggerProps
  extends React.ComponentProps<typeof Button> {}

export interface LinkComponentProps {
  to: string | undefined;
  href: string | undefined;
  children: React.ReactNode;
}
