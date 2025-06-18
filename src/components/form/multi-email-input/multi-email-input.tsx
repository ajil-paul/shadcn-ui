import React from 'react';

import { Controller } from 'react-hook-form';

import { MultiEmailInput } from '@components/multi-emails-input';

import { FormMultiEmailInputProps } from './types';

export const FormMultiEmailInput = ({
  control,
  name,
  ...otherProps
}: FormMultiEmailInputProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <MultiEmailInput
        {...field}
        error={fieldState.error?.message}
        {...otherProps}
      />
    )}
  />
);
