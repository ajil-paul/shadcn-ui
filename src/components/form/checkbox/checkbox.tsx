import React from 'react';

import { Controller } from 'react-hook-form';

import { Checkbox } from '@components/checkbox';

import { FormCheckboxProps } from './types';

const FormCheckbox = ({ control, name, ...otherProps }: FormCheckboxProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <Checkbox
        {...field}
        error={fieldState.error?.message}
        checked={field.value}
        onCheckedChange={field.onChange}
        {...otherProps}
      />
    )}
  />
);

export { FormCheckbox };
