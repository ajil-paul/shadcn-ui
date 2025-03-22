import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Yup from 'yup';

import { FormRadioGroup } from './radio-group';
import { Button } from '../../button/button';

import { useForm } from '../../../lib/hooks/useForm';

describe('FormRadioGroup Component', () => {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ];

  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  const TestWrapper = ({ defaultValue = '' }) => {
    const { control, handleSubmit } = useForm({
      defaultValues: { radioChoice: defaultValue },
      schema: Yup.object().shape({
        radioChoice: Yup.string().required('Selection is required'),
      }),
    });

    return (
      <form onSubmit={handleSubmit(() => {})}>
        <FormRadioGroup control={control} name="radioChoice">
          {options.map(({ label, value }) => (
            <FormRadioGroup.Item key={value} {...{ label, value }} />
          ))}
        </FormRadioGroup>
        <Button label="Submit" type="submit" />
      </form>
    );
  };

  it('renders the radio buttons', () => {
    render(<TestWrapper />);
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
  });

  it('updates value when selected', async () => {
    render(<TestWrapper />);
    const user = userEvent.setup();

    const option1 = screen.getByLabelText('Option 1') as HTMLInputElement;
    const option2 = screen.getByLabelText('Option 2') as HTMLInputElement;

    expect(option1).not.toBeChecked();
    expect(option2).not.toBeChecked();

    await user.click(option1);
    expect(option1).toBeChecked();
    expect(option2).not.toBeChecked();

    await user.click(option2);
    expect(option2).toBeChecked();
    expect(option1).not.toBeChecked();
  });

  it('shows validation error if no option is selected', async () => {
    render(<TestWrapper />);
    const user = userEvent.setup();
    const button = screen.getByText('Submit');

    await user.click(button);

    expect(screen.getByText('Selection is required')).toBeInTheDocument();
  });
});
