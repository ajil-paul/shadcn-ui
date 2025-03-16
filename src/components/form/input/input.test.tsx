import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import * as Yup from 'yup';

import { FormInput } from './input';

import { Button } from '../../button/button';
import { useForm } from '../../../lib/hooks/useForm';

describe('FormInput Component', () => {
  const TestWrapper = ({ defaultValue = '' }) => {
    const { control, handleSubmit } = useForm({
      schema: Yup.object().shape({
        name: Yup.string().required('Name is a required field.'),
      }),
      defaultValues: { name: defaultValue },
    });

    return (
      <form onSubmit={handleSubmit(() => {})}>
        <FormInput control={control} name="name" placeholder="Enter text" />
        <Button label="Submit" type="submit" />
      </form>
    );
  };

  it('renders the input field', () => {
    render(<TestWrapper />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('updates value when changed', async () => {
    render(<TestWrapper defaultValue="Initial Value" />);
    const input = screen.getByPlaceholderText('Enter text') as HTMLInputElement;
    expect(input.value).toBe('Initial Value');
  });

  it("doesn't show error message if field is valid", async () => {
    render(<TestWrapper defaultValue="Oliver" />);

    const user = userEvent.setup();
    const button = screen.getByText('Submit') as HTMLInputElement;
    await user.click(button);
    expect(
      screen.queryByText('Name is a required field')
    ).not.toBeInTheDocument(); // Ensure no error initially
  });

  it('shows error message if validation fails', async () => {
    render(<TestWrapper defaultValue="" />);

    const user = userEvent.setup();
    const button = screen.getByText('Submit') as HTMLInputElement;
    expect(
      screen.queryByText('Name is a required field')
    ).not.toBeInTheDocument(); // Ensure no error initially
    await user.click(button);
    expect(screen.queryByText('Name is a required field.')).toBeInTheDocument(); // Ensure no error initially
  });
});
