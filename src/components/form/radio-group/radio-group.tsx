import React from 'react';

import { Controller } from 'react-hook-form';

import { RadioGroup } from '@components/radio-group';

import { FormRadioGroupProps } from './types';

const FormRadioGroup = ({
  control,
  name,
  ...otherProps
}: FormRadioGroupProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <RadioGroup
        {...field}
        error={fieldState.error?.message}
        onValueChange={field.onChange}
        {...otherProps}
      />
    )}
  />
);

FormRadioGroup.Item = RadioGroup.Item;

export { FormRadioGroup };
