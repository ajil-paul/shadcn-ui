import React from 'react';
import { forwardRef } from 'react';

import { flatten, pluck } from 'ramda';
import ReactSelect, {
  MenuPosition,
  DropdownIndicatorProps,
  ActionMeta,
} from 'react-select';

import { Label } from '@base/label';
import { _existsBy } from '@bigbinary/neeto-cist';
import useFormIds from '@lib/hooks/useFormIds';
import useId from '@lib/hooks/useId';
import { cn } from '@lib/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';

import { SelectProps } from './types';
import ErrorText from '../common/error-text';
import HelpText from '../common/help-text';

const STRATEGIES = {
  default: 'default',
  fixed: 'fixed',
} as const;

const DropdownIndicator = ({ innerProps }: DropdownIndicatorProps) => (
  <div {...innerProps} className="shad-ui-select__indicator">
    <CaretSortIcon />
  </div>
);

const Select = forwardRef<any, SelectProps>(
  (
    {
      options = [],
      strategy = STRATEGIES.fixed,
      helpText,
      error,
      label,
      id: inputId,
      wrapperClassName = '',
      value,
      defaultValue,
      onChange,
      ...otherProps
    },
    ref
  ) => {
    const id = useId(inputId);
    const { formItemId } = useFormIds(id);

    const fixedPositionProps = {
      menuPortalTarget: document.body,
      styles: {
        menuPortal: (base: any) => ({
          ...base,
          zIndex: 999999,
          pointerEvents: 'all',
        }),
      },
      menuPosition: 'fixed' as MenuPosition,
    };
    const portalProps = strategy === STRATEGIES.fixed ? fixedPositionProps : {};

    const getOptionValue =
      otherProps.getOptionValue ?? ((option: any) => option.value);

    const handleChange = (
      selectedOption: any,
      actionMeta: ActionMeta<unknown>
    ) => {
      if (Array.isArray(selectedOption)) {
        onChange?.(selectedOption.map(getOptionValue), actionMeta);
      } else {
        onChange?.(getOptionValue(selectedOption), actionMeta);
      }
    };

    const findInOptions = (value: any) => {
      let currentOptions = options;
      const { isMulti } = otherProps;
      if (!value || isMulti || !Array.isArray(currentOptions)) return value;

      value = Array.isArray(value) ? value[0] : value;
      const isGrouped = _existsBy({ options: Array.isArray }, currentOptions);
      if (isGrouped) {
        const groups = pluck('options', currentOptions as { options: any[] }[]);
        currentOptions = flatten(groups);
      }

      return options.find((opt) => getOptionValue(opt) === value);
    };

    return (
      <div className={cn('space-y-1', wrapperClassName)}>
        {!!label && (
          <Label className="flex text-sm leading-none" htmlFor={formItemId}>
            {label}
          </Label>
        )}
        <ReactSelect
          ref={ref}
          className="basic-single"
          classNamePrefix="select"
          options={options}
          {...otherProps}
          getOptionValue={getOptionValue}
          onChange={handleChange}
          defaultValue={findInOptions(defaultValue)}
          value={findInOptions(value)}
          {...portalProps}
          classNames={{
            container: () => 'shad-ui-select-container',
            control: ({ isDisabled, isFocused }) =>
              cn('shad-ui-select__control', {
                'shad-ui-select__control--is-disabled': isDisabled,
                'shad-ui-select__control--is-focused': isFocused && !error,
                'shad-ui-select__control--destructive': !!error,
                'shad-ui-select__control--destructive--is-focused':
                  isFocused && !!error,
              }),
            singleValue: ({ isDisabled }) =>
              cn('shad-ui-select__single-value', {
                'shad-ui-select__single-value--is-disabled': isDisabled,
              }),
            multiValue: () => 'shad-ui-select__multi-value',
            multiValueLabel: () => 'shad-ui-select__multi-value-label',
            multiValueRemove: () => 'shad-ui-select__multi-value-remove',
            dropdownIndicator: () => 'shad-ui-select__indicator',
            indicatorSeparator: () => 'shad-ui-select__indicator-separator',
            menu: () => 'shad-ui-select__menu',
            option: ({ isDisabled, isFocused, isSelected }) =>
              cn('shad-ui-select__option', {
                'shad-ui-select__option--is-disabled': isDisabled,
                'shad-ui-select__option--is-focused': isFocused,
                'shad-ui-select__option--is-selected': isSelected,
              }),
            input: () => 'shad-ui-select__input',
            placeholder: () => 'shad-ui-select__placeholder',
          }}
          components={{ DropdownIndicator }}
        />
        {!!helpText && <HelpText id={id} text={helpText} />}
        {!!error && <ErrorText id={id} text={error} />}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
