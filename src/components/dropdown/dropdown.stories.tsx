import React from 'react';

import { LogOut } from 'lucide-react';

import type { Meta } from '@storybook/react';

import { Button } from '../button';

import { Dropdown, DropdownProps } from '.';

const meta: Meta<typeof Button> = {
  title: 'Components/Dropdown',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

const menuList = [
  { title: 'My Account', type: 'label' },
  { title: 'Profile', shortcut: '⇧⌘P' },
  { title: 'Billing', shortcut: '⌘B' },
  { title: 'Settings', shortcut: '⌘S' },
  { title: 'Delete', shortcut: '⌘D', danger: true },
  { title: 'Keyboard shortcuts', shortcut: '⌘K', disabled: true },
  { type: 'separator' },
  {
    title: 'New Team',
    type: 'checkbox',
    checked: true,
    onCheckedChange: undefined,
  },
  { title: 'GitHub' },
  {
    title: 'Support',
    children: [
      {
        title: 'API',
        children: [
          { title: 'My Account', type: 'label' },
          { title: 'Profile', shortcut: '⇧⌘P' },
          { title: 'Billing', shortcut: '⌘B' },
        ],
      },
      { title: 'Log out', shortcut: '⇧⌘Q' },
    ],
  },
  { type: 'separator' },
  { title: 'Log out', shortcut: '⇧⌘Q', icon: LogOut },
];

export const Default = (args: DropdownProps) => (
  <Dropdown {...args}>
    <Button variant="outline" label="Default" />
  </Dropdown>
);

Default.args = {
  menuList,
};
