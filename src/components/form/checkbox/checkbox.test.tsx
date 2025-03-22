import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Yup from 'yup';

import { FormCheckbox } from './checkbox';

import { Button } from '../../button/button';
import { useForm } from '../../../lib/hooks/useForm';

describe('FormCheckbox Component', () => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  const TestWrapper = ({ defaultChecked = false }) => {
    const { control, handleSubmit } = useForm({
      schema: Yup.object().shape({
        acceptTerms: Yup.boolean().oneOf([true], 'You must agree to the terms'),
      }),
      defaultValues: { acceptTerms: defaultChecked },
    });

    return (
      <form onSubmit={handleSubmit(() => {})}>
        <FormCheckbox
          control={control}
          name="acceptTerms"
          label="Accept terms"
        />
        <Button label="Submit" type="submit" />
      </form>
    );
  };

  it('renders the checkbox', () => {
    render(<TestWrapper />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('checkbox updates value when clicked', async () => {
    render(<TestWrapper />);
    const user = userEvent.setup();
    const checkbox = screen.getByLabelText('Accept terms') as HTMLInputElement;
    expect(checkbox.value).toBe('false');
    await user.click(checkbox);
    expect(checkbox.value).toBe('true');
  });

  it("doesn't show error message if valid", async () => {
    render(<TestWrapper />);

    const user = userEvent.setup();
    const checkbox = screen.getByLabelText('Accept terms') as HTMLInputElement;
    await user.click(checkbox);

    const button = screen.getByText('Submit') as HTMLInputElement;
    await user.click(button);
    expect(
      screen.queryByText('You must agree to the terms')
    ).not.toBeInTheDocument(); // Ensure no error initially
  });

  it('renders error message if validation fails', async () => {
    render(<TestWrapper />);

    const user = userEvent.setup();

    const button = screen.getByText('Submit') as HTMLInputElement;
    await user.click(button);
    expect(
      screen.queryByText('You must agree to the terms')
    ).toBeInTheDocument();
  });
});
