import React from 'react';

import * as Yup from 'yup';

import type { Meta } from '@storybook/react';

import { FormInput } from './input';
import { FormInputProps } from './types';
import { useForm } from '../../../lib/hooks/useForm';
import { Button } from '../../button/button';

const meta: Meta<FormInputProps> = {
  title: 'Form Components/Input/Form',
  component: FormInput,
  tags: ['autodocs'],
};

export default meta;

export const Form = () => {
  const { control, handleSubmit } = useForm({
    schema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
    }),
    defaultValues: { name: '' },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((values, event) => console.log(values, event))}
    >
      <FormInput
        control={control}
        label="Name"
        placeholder="Enter your name"
        name="name"
      />
      <Button label="Submit" type="submit" />
    </form>
  );
};

Form.parameters = {
  docs: {
    source: {
      code: `
import { useForm } from "hooks/useForm";
import * as Yup from "yup";

import FormInput from "@shad-ui/Form/Input";
import Button from "@shad-ui/Button";

const Form = (args) => {
  const { control, handleSubmit } = useForm({
    schema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
    }),
    defaultValues: { name: "" },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((...args) => console.log(args))}
    >
      <FormInput
        label="Name"
        placeholder="Enter your name"
        name="name"
        control={control}
        {...args}
        component={Input}
      />
      <Button label="Submit" type="submit" />
    </form>
  );
};
`,
    },
  },
};
