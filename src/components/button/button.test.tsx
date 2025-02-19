import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button Component', () => {
  it('renders with label', () => {
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

  it('shows loading spinner when loading', () => {
    render(<Button loading label="Click me" />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    const TestIcon = () => <svg data-testid="test-icon" />;
    render(<Button icon={TestIcon} label="Click me" />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('positions icon correctly', () => {
    const TestIcon = () => <svg data-testid="test-icon" />;
    render(<Button icon={TestIcon} label="Click me" iconPosition="right" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('flex-row-reverse');
  });
});
