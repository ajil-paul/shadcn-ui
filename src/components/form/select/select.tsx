import React, { forwardRef, startTransition, useRef } from 'react';

import { either, isEmpty, isNil } from 'ramda';
import { Controller } from 'react-hook-form';

import { Select } from '@components/select';

import { FormSelectProps } from './types';

const FormSelect = forwardRef<any, FormSelectProps>((props, ref) => {
  const {
    control,
    name,
    options = [],
    getOptionValue = null,
    isMulti = false,
    ...otherProps
  } = props;

  const isMenuOpen = useRef(otherProps.defaultMenuIsOpen);

  const getRealOptionValue = (option: any) => {
    if (typeof getOptionValue !== 'function') {
      return option.value;
    }

    return getOptionValue(option);
  };

  const buildValueObj = (value: any, options: any[]) => {
    // For multi-select with array of values, convert to array of option objects
    if (isMulti && Array.isArray(value)) {
      return value
        .map((val) =>
          options.find((option) => getRealOptionValue(option) === val)
        )
        .filter(Boolean);
    }

    // For single-select, if value is already an object, return it
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return value;
    }

    // For single-select with primitive value, find the matching option
    return options.filter((option) => getRealOptionValue(option) === value)[0];
  };

  const finalGetOptionValue = getOptionValue || ((option: any) => option.value);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Select
          {...field}
          {...{ options }}
          error={fieldState.error?.message}
          getOptionValue={finalGetOptionValue}
          ref={ref}
          isMulti={!!isMulti}
          value={
            either(isNil, isEmpty)(field.value)
              ? null
              : buildValueObj(field.value, options)
          }
          onBlur={() =>
            startTransition(() => {
              field.onBlur();
            })
          }
          onChange={field.onChange}
          {...otherProps}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && isMenuOpen.current) {
              event.stopPropagation();
            }
            otherProps.onKeyDown?.(event);
          }}
          onMenuClose={() => {
            isMenuOpen.current = false;
            otherProps.onMenuClose?.();
          }}
          onMenuOpen={() => {
            isMenuOpen.current = true;
            otherProps.onMenuOpen?.();
          }}
        />
      )}
    />
  );
});

FormSelect.displayName = 'FormSelect';

export { FormSelect };
