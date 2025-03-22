import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Yup from 'yup';

import { FormSwitch } from './switch';

import { useForm } from '../../../lib/hooks/useForm';

describe('FormSwitch Component', () => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  const TestWrapper = ({ defaultChecked = false }) => {
    const { control, handleSubmit } = useForm({
      defaultValues: { toggleOption: defaultChecked },
      schema: Yup.object().shape({
        toggleOption: Yup.boolean().oneOf([true], 'Must be enabled'),
      }),
    });

    return (
      <form onSubmit={handleSubmit(() => {})}>
        <FormSwitch
          data-testid="toggleOption"
          control={control}
          name="toggleOption"
        />
      </form>
    );
  };

  it('renders the switch component', () => {
    render(<TestWrapper />);
    expect(screen.getByTestId('toggleOption')).toBeInTheDocument();
  });

  it('toggles value when clicked', async () => {
    render(<TestWrapper />);
    const user = userEvent.setup();
    const switchButton = screen.getByTestId('toggleOption') as HTMLInputElement;

    expect(switchButton.value).toBe('false');
    await user.click(switchButton);
    expect(switchButton.value).toBe('true');

    await user.click(switchButton);
    expect(switchButton.value).toBe('false');
  });
});
