import React from 'react';

import * as Yup from 'yup';

import type { Meta } from '@storybook/react';

import { FormSelect } from './select';
import { FormSelectProps } from './types';
import { useForm } from '../../../lib/hooks/useForm';
import { Button } from '../../button/button';

const meta: Meta<FormSelectProps> = {
  title: 'Form Components/Select/Form',
  component: FormSelect,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

const defaultOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'mint', label: 'Mint' },
  { value: 'coffee', label: 'Coffee' },
];

export const Basic = () => {
  const { control, handleSubmit } = useForm({
    schema: Yup.object().shape({
      flavor: Yup.string().required('Please select a flavor'),
    }),
    defaultValues: { flavor: 'chocolate' },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((values) => console.log('Form values:', values))}
    >
      <FormSelect
        control={control}
        name="flavor"
        label="Select your favorite flavor"
        placeholder="Choose a flavor..."
        options={defaultOptions}
      />
      <Button label="Submit" type="submit" />
    </form>
  );
};

export const MultiSelect = () => {
  const { control, handleSubmit } = useForm({
    schema: Yup.object().shape({
      flavors: Yup.array()
        .min(1, 'Please select at least one flavor')
        .required('Please select flavors'),
    }),
    defaultValues: { flavors: ['chocolate', 'mint'] },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((values) => console.log('Form values:', values))}
    >
      <FormSelect
        control={control}
        name="flavors"
        label="Select multiple flavors"
        placeholder="Choose flavors..."
        options={defaultOptions}
        isMulti
      />
      <Button label="Submit" type="submit" />
    </form>
  );
};
