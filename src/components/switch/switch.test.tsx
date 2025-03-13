import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Switch } from './switch';

describe('Switch', () => {
  it('renders correctly', () => {
    render(<Switch data-testid="switch" />);
    const switchElement = screen.getByTestId('switch');

    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute('role', 'switch');
  });

  it('toggles state on click', () => {
    render(<Switch data-testid="switch" />);
    const switchElement = screen.getByTestId('switch');

    expect(switchElement).toHaveAttribute('data-state', 'unchecked');

    fireEvent.click(switchElement);
    expect(switchElement).toHaveAttribute('data-state', 'checked');

    fireEvent.click(switchElement);
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');
  });

  it('respects disabled state', () => {
    render(<Switch data-testid="switch" disabled />);
    const switchElement = screen.getByTestId('switch');

    expect(switchElement).toBeDisabled();
    fireEvent.click(switchElement);
    expect(switchElement).toHaveAttribute('data-state', 'unchecked'); // Should not change state
  });

  it('applies custom className', () => {
    render(<Switch className="custom-class" data-testid="switch" />);
    const switchElement = screen.getByTestId('switch');

    expect(switchElement).toHaveClass('custom-class');
  });
});
