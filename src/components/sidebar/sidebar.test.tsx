import React from 'react';

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { SidebarOpen } from 'lucide-react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { Sidebar, SidebarProps } from './';

import { Button } from '../button';

const defaultProps: SidebarProps = {
  header: <Button label="Test Header" />,
  menuSections: [
    {
      key: 'section1',
      title: 'Section 1',
      items: [
        { key: 'item1', title: 'Item 1', path: '/item1', icon: SidebarOpen },
      ],
    },
  ],
  footerMenuSections: [],
  footer: <div>Footer Content</div>,
  variant: 'inset',
};

describe('Sidebar Component', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(), // Older API
      removeListener: vi.fn(), // Older API
      dispatchEvent: vi.fn(),
    }));
  });

  it('renders correctly with default props', async () => {
    render(
      <MemoryRouter>
        <Sidebar {...defaultProps} defaultOpen />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Header')).toBeInTheDocument();
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('toggles sidebar on button click', async () => {
    render(
      <MemoryRouter>
        <Sidebar {...defaultProps} />
      </MemoryRouter>
    );
    const toggleButton = screen.getByTestId('toggle-sidebar');
    await userEvent.click(toggleButton);
    waitFor(() =>
      expect(screen.getByText('Test Header')).not.toBeInTheDocument()
    );
  });

  it('renders collapsed when defaultOpen is false', () => {
    render(
      <MemoryRouter>
        <Sidebar {...defaultProps} defaultOpen={false} />
      </MemoryRouter>
    );
    waitFor(() =>
      expect(screen.queryByText('Section 1')).not.toBeInTheDocument()
    );
  });

  it('renders mobile toggle button when isMobile is true', () => {
    vi.stubGlobal('matchMedia', (query) => ({
      matches: query.includes('max-width: 768px'), // Simulates mobile when max-width is 768px
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(), // Older API
      removeListener: vi.fn(), // Older API
      dispatchEvent: vi.fn(),
    }));

    render(
      <MemoryRouter>
        <Sidebar {...defaultProps} />
      </MemoryRouter>
    );
    const toggleButton = screen.getByTestId('toggle-sidebar');
    expect(toggleButton).toBeInTheDocument();
  });

  it('renders sidebar with custom className', () => {
    render(
      <MemoryRouter>
        <Sidebar
          {...defaultProps}
          className="custom-class"
          data-testid="sidebar-wrapper"
        />
      </MemoryRouter>
    );
    expect(screen.getByTestId('sidebar-wrapper')).toHaveClass('custom-class');
  });

  it('renders different variants correctly', () => {
    ['inset', 'sidebar', 'floating'].forEach((variant) => {
      render(
        <MemoryRouter>
          <Sidebar
            {...defaultProps}
            variant={variant as SidebarProps['variant']}
          />
        </MemoryRouter>
      );
      waitFor(() =>
        expect(screen.getByText('Test Header')).toBeInTheDocument()
      );
    });
  });

  it('renders menu items with icons', () => {
    render(
      <MemoryRouter>
        <Sidebar {...defaultProps} />
      </MemoryRouter>
    );
    waitFor(() =>
      expect(screen.getByTestId('sidebar-icon-item1')).toBeInTheDocument()
    );
  });

  it('renders nested menu items correctly', () => {
    const nestedProps: SidebarProps = {
      ...defaultProps,
      menuSections: [
        {
          key: 'section1',
          title: 'Section 1',
          items: [
            {
              key: 'item1',
              title: 'Item 1',
              path: '/item1',
              children: [
                { key: 'subitem1', title: 'Sub Item 1', path: '/subitem1' },
              ],
            },
          ],
        },
      ],
    };

    render(
      <MemoryRouter>
        <Sidebar {...nestedProps} />
      </MemoryRouter>
    );
    waitFor(() => expect(screen.getByText('Item 1')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('Sub Item 1')).toBeInTheDocument());
  });
});
