import React from 'react';

import * as Yup from 'yup';

import type { Meta } from '@storybook/react';

import { FormCheckbox } from './checkbox';
import { FormCheckboxProps } from './types';
import { useForm } from '../../../lib/hooks/useForm';
import { Button } from '../../button/button';

const meta: Meta<FormCheckboxProps> = {
  title: 'Form Components/Checkbox/Form',
  component: FormCheckbox,
  tags: ['autodocs'],
};

export default meta;

export const Form = () => {
  const { control, handleSubmit } = useForm({
    schema: Yup.object().shape({
      agreeTerms: Yup.boolean().oneOf([true], 'You must agree to the terms'),
    }),
    defaultValues: { agreeTerms: false },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((values, event) => console.log(values, event))}
    >
      <FormCheckbox
        control={control}
        label="Agree terms and conditions"
        name="agreeTerms"
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

import FormCheckbox from "@shad-ui/Form/Checkbox";
import Button from "@shad-ui/Button";

const Form = (args) => {
  const { control, handleSubmit } = useForm({
    schema: Yup.object().shape({
      agreeTerms: Yup.boolean().oneOf([true], "You must agree to the terms"),
    }),
    defaultValues: { agreeTerms: false },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((values, event) => console.log(values, event))}
    >
      <FormCheckbox
        control={control}
        label="Agree terms and conditions"
        name="agreeTerms"
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
