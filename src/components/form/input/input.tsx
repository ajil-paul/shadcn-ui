import React from 'react';

import { Controller } from 'react-hook-form';

import { Input } from '@components/input';

import { FormInputProps } from './types';

const FormInput = ({ control, name, ...otherProps }: FormInputProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <Input {...field} error={fieldState.error?.message} {...otherProps} />
    )}
  />
);

export { FormInput };
