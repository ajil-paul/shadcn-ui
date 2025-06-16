import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MultiEmailInput } from './multi-email-input';
import { EmailOption } from './types';
import '@testing-library/jest-dom';

describe('MultiEmailInput', () => {
  const mockOnChange = vi.fn();

  const defaultProps = {
    onChange: mockOnChange,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<MultiEmailInput {...defaultProps} />);
    expect(screen.getByText('Email(s)')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<MultiEmailInput {...defaultProps} label="Custom Label" />);
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
  });

  it('handles email input and validation', async () => {
    render(<MultiEmailInput {...defaultProps} />);
    const input = screen.getByRole('combobox');

    await userEvent.type(input, 'test@example.com');
    await userEvent.keyboard('{Enter}');

    expect(mockOnChange).toHaveBeenCalledWith([
      {
        value: 'test@example.com',
        label: 'test@example.com',
        valid: true,
      },
    ]);
  });

  it('handles multiple email inputs with separators', async () => {
    render(<MultiEmailInput {...defaultProps} />);
    const input = screen.getByRole('combobox');

    // First email
    await userEvent.type(input, 'test1@example.com');
    await userEvent.keyboard('{Enter}');
    expect(mockOnChange).toHaveBeenNthCalledWith(1, [
      {
        value: 'test1@example.com',
        label: 'test1@example.com',
        valid: true,
      },
    ]);

    // Second email
    await userEvent.type(input, 'test2@example.com');
    await userEvent.keyboard('{Enter}');
    expect(mockOnChange).toHaveBeenNthCalledWith(2, [
      {
        value: 'test2@example.com',
        label: 'test2@example.com',
        valid: true,
      },
    ]);
  });

  it('prevents duplicate emails', async () => {
    const initialValue: EmailOption[] = [
      {
        value: 'test@example.com',
        label: 'test@example.com',
        valid: true,
      },
    ];
    render(<MultiEmailInput {...defaultProps} value={initialValue} />);
    const input = screen.getByRole('combobox');

    await userEvent.type(input, 'test@example.com');
    await userEvent.keyboard('{Enter}');

    expect(mockOnChange).toHaveBeenCalledWith(initialValue);
  });

  it('handles keyboard interactions', async () => {
    render(<MultiEmailInput {...defaultProps} />);
    const input = screen.getByRole('combobox');

    // Test Enter key
    await userEvent.type(input, 'test@example.com');
    await userEvent.keyboard('{Enter}');
    expect(mockOnChange).toHaveBeenNthCalledWith(1, [
      {
        value: 'test@example.com',
        label: 'test@example.com',
        valid: true,
      },
    ]);

    // Test comma separator
    await userEvent.type(input, 'another@example.com');
    await userEvent.keyboard(',');
    expect(mockOnChange).toHaveBeenNthCalledWith(2, [
      {
        value: 'another@example.com',
        label: 'another@example.com',
        valid: true,
      },
    ]);
  });

  it('displays error message when provided', () => {
    render(<MultiEmailInput {...defaultProps} error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<MultiEmailInput {...defaultProps} disabled />);
    const input = screen.getByRole('combobox', { hidden: true });
    expect(input).toHaveAttribute('disabled');
  });

  it('shows counter when enabled', () => {
    const value: EmailOption[] = [
      {
        value: 'test1@example.com',
        label: 'test1@example.com',
        valid: true,
      },
      {
        value: 'test2@example.com',
        label: 'test2@example.com',
        valid: true,
      },
    ];
    render(
      <MultiEmailInput
        {...defaultProps}
        value={value}
        counter={{ startsFrom: 1 }}
      />
    );
    expect(screen.getByText('2 emails')).toBeInTheDocument();
  });

  it('handles custom counter label', () => {
    const value: EmailOption[] = [
      {
        value: 'test@example.com',
        label: 'test@example.com',
        valid: true,
      },
    ];
    render(
      <MultiEmailInput
        {...defaultProps}
        value={value}
        counter={{ label: 'recipients' }}
      />
    );
    expect(screen.getByText('1 recipients')).toBeInTheDocument();
  });

  it('handles filterInvalidEmails prop', async () => {
    const value: EmailOption[] = [
      {
        value: 'valid@example.com',
        label: 'valid@example.com',
        valid: true,
      },
      {
        value: 'invalid-email',
        label: 'invalid-email',
        valid: false,
      },
    ];
    render(
      <MultiEmailInput
        {...defaultProps}
        error="Emails are not valid"
        value={value}
        filterInvalidEmails={{ label: 'Filter invalid emails' }}
      />
    );

    const filterButton = screen.getByRole('button', {
      name: /filter invalid emails/i,
    });
    await userEvent.click(filterButton);

    expect(mockOnChange).toHaveBeenCalledWith([
      {
        value: 'valid@example.com',
        label: 'valid@example.com',
        valid: true,
      },
    ]);
  });
});
