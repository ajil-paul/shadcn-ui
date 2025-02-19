import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';
import { MemoryRouter } from 'react-router-dom';

const MockIcon = () => <span data-testid="mock-icon">Icon</span>;

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" />);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(<Button icon={MockIcon} label="Email" />);
    expect(screen.getByRole('button', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as link when "to" prop is provided', () => {
    render(
      <MemoryRouter>
        <Button to="/path" label="Navigate" />
      </MemoryRouter>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/path');
  });

  it('shows loading state', () => {
    render(<Button loading label="Loading" />);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
