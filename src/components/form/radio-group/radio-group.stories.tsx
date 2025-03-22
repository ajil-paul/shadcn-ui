import React from 'react';

import * as Yup from 'yup';

import type { Meta } from '@storybook/react';

import { FormRadioGroup } from './radio-group';
import { FormRadioGroupProps } from './types';
import { useForm } from '../../../lib/hooks/useForm';
import { Button } from '../../button/button';

const meta: Meta<FormRadioGroupProps> = {
  title: 'Form Components/RadioGroup/Form',
  component: FormRadioGroup,
  tags: ['autodocs'],
};

export default meta;

export const Form = () => {
  const { control, handleSubmit } = useForm({
    schema: Yup.object().shape({
      option: Yup.string().required('Option is required'),
    }),
    defaultValues: { option: null },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((values, event) => console.log(values, event))}
    >
      <FormRadioGroup control={control} label="Select an option" name="option">
        <FormRadioGroup.Item value="1" label="Option 1" />
        <FormRadioGroup.Item value="2" label="Option 2" />
        <FormRadioGroup.Item value="3" label="Option 3" />
      </FormRadioGroup>
      <Button label="Submit" type="submit" />
    </form>
  );
};

Form.parameters = {
  docs: {
    source: {
      code: `
import * as Yup from "yup";

import { useForm, FormRadioGroup, Button } from "@shad-ui";


const Form = (args) => {
  const { control, handleSubmit } = useForm({
    schema: Yup.object().shape({
      option: Yup.string().required("Option is required"),
    }),
    defaultValues: { option: null },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((values, event) => console.log(values, event))}
    >
      <FormRadioGroup
        control={control}
        label="Select an option"
        name="option"
        {...args}
      >
        <RadioGroup.Item value="1" label="Option 1" />
        <RadioGroup.Item value="2" label="Option 2" />
        <RadioGroup.Item value="3" label="Option 3" />
      </FormRadioGroup>
      <Button label="Submit" type="submit" />
    </form>
  );
};
`,
    },
  },
};
