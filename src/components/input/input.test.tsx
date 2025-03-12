import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Input } from './input';

describe('Input', () => {
  const defaultProps = {
    label: 'Email',
    helpText: 'Enter your email address',
    id: 'email-input',
    error: '',
    onChange: vi.fn(),
    placeholder: 'Enter email',
  };

  it('renders input with label and help text', () => {
    render(<Input {...defaultProps} />);

    expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.helpText)).toBeInTheDocument();
  });

  it('renders error message when error is provided', () => {
    render(<Input {...defaultProps} error="Invalid email" />);

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('calls onChange when user types', () => {
    render(<Input {...defaultProps} />);

    const input = screen.getByPlaceholderText(defaultProps.placeholder);
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('supports disabled state', () => {
    render(<Input {...defaultProps} disabled />);

    const input = screen.getByPlaceholderText(defaultProps.placeholder);
    expect(input).toBeDisabled();
  });

  it('renders prefix and suffix if provided', () => {
    render(
      <Input
        {...defaultProps}
        prefix={<span data-testid="prefix">P</span>}
        suffix={<span data-testid="suffix">S</span>}
      />
    );

    expect(screen.getByTestId('prefix')).toBeInTheDocument();
    expect(screen.getByTestId('suffix')).toBeInTheDocument();
  });

  it('handles focus and blur events', () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    render(<Input {...defaultProps} onFocus={onFocus} onBlur={onBlur} />);

    const input = screen.getByPlaceholderText(defaultProps.placeholder);
    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(onFocus).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
  });
});
