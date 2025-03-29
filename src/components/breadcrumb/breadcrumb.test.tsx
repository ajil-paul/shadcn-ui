import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import { Breadcrumb } from './breadcrumb';

const renderBreadcrumb = (items) => {
  return render(
    <MemoryRouter>
      <Breadcrumb items={items} />
    </MemoryRouter>
  );
};

describe('Breadcrumb', () => {
  it('renders breadcrumb items correctly', () => {
    renderBreadcrumb([
      { path: '/', name: 'Home' },
      { path: '/products', name: 'Products' },
      { path: '/electronics', name: 'Electronics' },
    ]);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('renders only last item as BreadcrumbPage', () => {
    renderBreadcrumb([
      { path: '/', name: 'Home' },
      { path: '/products', name: 'Products' },
      { path: '/electronics', name: 'Electronics' },
    ]);

    expect(screen.getByText('Electronics').closest('span')).toHaveAttribute(
      'aria-current',
      'page'
    );
  });
});
