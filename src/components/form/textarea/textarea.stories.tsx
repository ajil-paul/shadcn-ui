import React from 'react';

import * as Yup from 'yup';

import type { Meta } from '@storybook/react';

import { useForm } from '../../../lib/hooks/useForm';
import { Button } from '../../button/button';
import { FormTextareaProps, FormTextarea } from '../textarea';

const meta: Meta<FormTextareaProps> = {
  title: 'Form Components/Textarea/Form',
  component: FormTextarea,
  tags: ['autodocs'],
};

export default meta;

export const Form = () => {
  const { control, handleSubmit } = useForm({
    schema: Yup.object().shape({
      description: Yup.string().required('Description is required'),
    }),
    defaultValues: { description: '' },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((values, event) => console.log(values, event))}
    >
      <FormTextarea
        control={control}
        label="Description"
        placeholder="Enter the description"
        name="description"
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

import FormTextarea from "@shad-ui/Form/Textarea";
import Button from "@shad-ui/Button";

const Form = (args) => {
  const { control, handleSubmit } = useForm({
    schema: Yup.object().shape({
      description: Yup.string().required("Description is required"),
    }),
    defaultValues: { description: "" },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((values, event) => console.log(values, event))}
    >
      <FormTextarea
        control={control}
        label="Description"
        placeholder="Enter the description"
        name="description"
        {...args}
      />
      <Button label="Submit" type="submit" />
    </form>
  );
};
`,
    },
  },
};
