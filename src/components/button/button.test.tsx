import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders children when not loading', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('is disabled when loading', () => {
    render(<Button loading label="Click me" />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled label="Click me" />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
