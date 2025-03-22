import React from 'react';

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Settings2 } from 'lucide-react';

import { Dropdown } from './dropdown';

const menuList = [
  { key: 'label', type: 'label', title: 'Label' },
  { key: 'item1', type: 'item', title: 'Item 1' },
  { key: 'item2', type: 'item', title: 'Item 2', shortcut: '⌘S' },
  { key: 'item3', type: 'item', title: 'Settings', icon: Settings2 },
  { key: 'checkbox', type: 'checkbox', title: 'Checkbox Item', checked: true },
  { key: 'separator', type: 'separator' },
  {
    key: 'submenu',
    type: 'submenu',
    title: 'Submenu',
    children: [{ key: 'subitem1', type: 'item', title: 'Sub Item 1' }],
  },
];

describe('Dropdown component', () => {
  it('renders the trigger button', () => {
    render(
      <Dropdown menuList={menuList}>
        <button>Open Menu</button>
      </Dropdown>
    );
    expect(screen.getByText('Open Menu')).toBeInTheDocument();
  });

  it('opens and renders a label, separator, and checkbox when clicked', async () => {
    render(
      <Dropdown menuList={menuList}>
        <button>Open Menu</button>
      </Dropdown>
    );

    await userEvent.click(screen.getByText('Open Menu'));
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByText('Checkbox Item')).toBeInTheDocument();
  });

  it('renders an icon if provided', async () => {
    const { container } = render(
      <Dropdown menuList={menuList}>
        <button>Open Menu</button>
      </Dropdown>
    );

    await userEvent.click(screen.getByText('Open Menu'));
    const element = document.body.querySelector('.lucide-settings2');
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(element).toBeInTheDocument();
  });

  it('renders a submenu and opens it on hover', async () => {
    render(
      <Dropdown menuList={menuList}>
        <button>Open Menu</button>
      </Dropdown>
    );

    await userEvent.click(screen.getByText('Open Menu'));
    expect(screen.getByText('Submenu')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Submenu'));
    expect(screen.getByText('Sub Item 1')).toBeInTheDocument();
  });
});
