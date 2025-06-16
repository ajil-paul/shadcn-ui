import React from 'react';

import { prop } from 'ramda';
import * as Yup from 'yup';

import type { Meta } from '@storybook/react';

import { useForm } from '../../../lib/hooks/useForm';
import { Button } from '../../button/button';

import { FormMultiEmailInput, FormMultiEmailInputProps } from '.';

const meta: Meta<FormMultiEmailInputProps> = {
  title: 'Form Components/MultiEmailInput/Form',
  component: FormMultiEmailInput,
  tags: ['autodocs'],
};

export default meta;

export const Form = () => {
  const { control, handleSubmit } = useForm({
    schema: Yup.object().shape({
      emails: Yup.array()
        .min(1, 'Please enter atleast one email.')
        .test(
          'are-all-emails-valid',
          'Please make sure all emails are valid.',
          (emails = []) => emails.every(prop('valid'))
        )
        .nullable(),
    }),
    defaultValues: { emails: [] },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((values, event) => console.log(values, event))}
    >
      <FormMultiEmailInput
        control={control}
        label="Enter emails"
        placeholder="Enter emails"
        name="emails"
      />
      <Button label="Submit" type="submit" />
    </form>
  );
};

Form.parameters = {
  docs: {
    source: {
      code: `
import * as Yup from "yup";

import { useForm, FormMultiEmailInput, Button } from "@shad-ui";

const Form = (args) => {
  const { control, handleSubmit } = useForm({
    schema: Yup.object().shape({
      emails: Yup.array()
        .min(1, 'Please enter atleast one email.')
        .test(
          'are-all-emails-valid',
          'Please make sure all emails are valid.',
          (emails = []) => emails.every(prop('valid'))
        )
        .nullable(),
    }),
    defaultValues: { emails: [] },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((values, event) => console.log(values, event))}
    >
      <FormMultiEmailInput
        control={control}
        label="Enter emails"
        placeholder="Enter emails"
        name="emails"
      />
      <Button label="Submit" type="submit" />
    </form>
  );
};
`,
    },
  },
};
