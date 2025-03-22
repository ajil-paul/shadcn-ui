import React from 'react';

import type { Meta } from '@storybook/react';

import { FormSwitch } from './switch';
import { FormSwitchProps } from './types';
import { useForm } from '../../../lib/hooks/useForm';
import { Button } from '../../button/button';
import { Label } from '../../label/label';

const meta: Meta<FormSwitchProps> = {
  title: 'Form Components/Switch/Form',
  component: FormSwitch,
  tags: ['autodocs'],
};

export default meta;

export const Form = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: { sendNotification: false },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((values, event) => console.log(values, event))}
    >
      <div className="flex items-center space-x-2">
        <FormSwitch
          control={control}
          id="sendNotification"
          name="sendNotification"
        />
        <Label htmlFor="sendNotification">Send notifications</Label>
      </div>
      <Button label="Submit" type="submit" />
    </form>
  );
};

Form.parameters = {
  docs: {
    source: {
      code: `
import { useForm, FormSwitch, Button } from "@shad-ui";

const Form = (args) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { sendNotification: false },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((values, event) => console.log(values, event))}
    >
      <div className="flex items-center space-x-2">
        <FormSwitch
          control={control}
          id="sendNotification"
          name="sendNotification"
          {...args}
        />
        <Label htmlFor="sendNotification">Send notifications</Label>
      </div>
      <Button label="Submit" type="submit" />
    </form>
  );
};
`,
    },
  },
};
