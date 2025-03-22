import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RadioGroup } from './radio-group';
import { describe, it, expect, vi } from 'vitest';

describe('RadioGroup', () => {
  const defaultProps = {
    label: 'Select an option',
    helpText: 'Choose one of the options below',
    id: 'radio-group',
    error: '',
    onValueChange: vi.fn(),
  };

  it('renders radio group with label and help text', () => {
    render(
      <RadioGroup {...defaultProps}>
        <RadioGroup.Item value="option1" label="Option 1" />
        <RadioGroup.Item value="option2" label="Option 2" />
      </RadioGroup>
    );

    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.helpText)).toBeInTheDocument();
  });

  it('renders error message when error is provided', () => {
    render(
      <RadioGroup {...defaultProps} error="This field is required">
        <RadioGroup.Item value="option1" label="Option 1" />
        <RadioGroup.Item value="option2" label="Option 2" />
      </RadioGroup>
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('calls onValueChange when a radio button is selected', () => {
    render(
      <RadioGroup {...defaultProps}>
        <RadioGroup.Item value="option1" label="Option 1" />
        <RadioGroup.Item value="option2" label="Option 2" />
      </RadioGroup>
    );

    const option1 = screen.getByLabelText('Option 1');
    fireEvent.click(option1);

    expect(defaultProps.onValueChange).toHaveBeenCalledWith('option1');
  });

  it('supports default selected value', () => {
    render(
      <RadioGroup {...defaultProps} defaultValue="option2">
        <RadioGroup.Item value="option1" label="Option 1" />
        <RadioGroup.Item value="option2" label="Option 2" />
      </RadioGroup>
    );

    const option2 = screen.getByLabelText('Option 2');
    expect(option2).toBeChecked();
  });

  it('updates selected value on user interaction', () => {
    render(
      <RadioGroup {...defaultProps}>
        <RadioGroup.Item value="option1" label="Option 1" />
        <RadioGroup.Item value="option2" label="Option 2" />
      </RadioGroup>
    );

    const option1 = screen.getByLabelText('Option 1');
    const option2 = screen.getByLabelText('Option 2');

    fireEvent.click(option1);
    expect(option1).toBeChecked();
    expect(option2).not.toBeChecked();

    fireEvent.click(option2);
    expect(option2).toBeChecked();
    expect(option1).not.toBeChecked();
  });
});
