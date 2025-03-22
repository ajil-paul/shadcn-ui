import React from 'react';

import { Controller } from 'react-hook-form';

import { Textarea } from '@components/textarea';

import { FormTextareaProps } from './types';

const FormTextarea = ({ control, name, ...otherProps }: FormTextareaProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <Textarea {...field} error={fieldState.error?.message} {...otherProps} />
    )}
  />
);

export { FormTextarea };
