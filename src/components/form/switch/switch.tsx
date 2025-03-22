import React from 'react';

import { Controller } from 'react-hook-form';

import { Switch } from '@components/switch';

import { FormSwitchProps } from './types';

const FormSwitch = ({ control, name, ...otherProps }: FormSwitchProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <Switch
        {...field}
        checked={field.value}
        onCheckedChange={field.onChange}
        {...otherProps}
      />
    )}
  />
);

export { FormSwitch };
