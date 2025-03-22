import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Select } from './select';

describe('Select', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  it('renders label and help text', () => {
    render(
      <Select
        label="Choose an option"
        helpText="This is a dropdown"
        options={options}
      />
    );

    expect(screen.getByText('Choose an option')).toBeInTheDocument();
    expect(screen.getByText('This is a dropdown')).toBeInTheDocument();
  });

  it('renders error message when provided', () => {
    render(
      <Select
        label="Choose an option"
        error="This field is required"
        options={options}
      />
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('calls onChange when an option is selected', async () => {
    const handleChange = vi.fn();
    render(
      <Select
        label="Choose an option"
        options={options}
        onChange={handleChange}
      />
    );

    const selectInput = screen.getByRole('combobox');
    fireEvent.focus(selectInput);
    fireEvent.keyDown(selectInput, { key: 'ArrowDown' });
    fireEvent.keyDown(selectInput, { key: 'Enter' });

    expect(handleChange).toHaveBeenCalled();
  });

  it('supports default selected value', () => {
    render(
      <Select
        label="Choose an option"
        options={options}
        defaultValue="option2"
      />
    );

    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });
});
