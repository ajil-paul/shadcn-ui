import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  const defaultProps = {
    label: 'Accept terms',
    helpText: 'You must agree before proceeding.',
    id: 'terms-checkbox',
    error: '',
    onCheckedChange: vi.fn(),
  };

  it('renders the checkbox', () => {
    render(<Checkbox data-testid="custom-checkbox" />);
    const checkbox = screen.getByTestId('custom-checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders checkbox with label and help text', () => {
    render(<Checkbox {...defaultProps} />);

    expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.helpText)).toBeInTheDocument();
  });

  it('renders error message when error is provided', () => {
    render(<Checkbox {...defaultProps} error="This field is required" />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('toggles checked state when clicked', async () => {
    render(<Checkbox data-testid="custom-checkbox" />);
    const checkbox = screen.getByTestId('custom-checkbox');

    expect(checkbox).not.toBeChecked(); // Initially unchecked

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked(); // Should be checked after click

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked(); // Should be unchecked after second click
  });

  it('renders with a custom class name', () => {
    render(<Checkbox className="custom-class" data-testid="custom-checkbox" />);
    const checkbox = screen.getByTestId('custom-checkbox');
    expect(checkbox).toHaveClass('custom-class');
  });

  it('does not toggle when disabled', async () => {
    render(<Checkbox data-testid="custom-checkbox" disabled />);
    const checkbox = screen.getByTestId('custom-checkbox');

    expect(checkbox).toBeDisabled();
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked(); // Should remain unchecked
  });

  it('calls onCheckedChange when clicked', () => {
    render(<Checkbox {...defaultProps} />);

    const checkbox = screen.getByLabelText(defaultProps.label);
    fireEvent.click(checkbox);

    expect(defaultProps.onCheckedChange).toHaveBeenCalled();
  });

  it('supports default checked state', () => {
    render(<Checkbox {...defaultProps} checked />);

    const checkbox = screen.getByLabelText(defaultProps.label);
    expect(checkbox).toBeChecked();
  });

  it('updates checked state on user interaction', () => {
    render(<Checkbox {...defaultProps} />);

    const checkbox = screen.getByLabelText(defaultProps.label);
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(defaultProps.onCheckedChange).toHaveBeenCalled();
  });
});
