import React, { useState, forwardRef } from 'react';

import {
  GroupBase,
  StylesConfig,
  CSSObjectWithLabel,
  MultiValue,
  ActionMeta,
} from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { Label } from '@components/label';
import useFormIds from '@lib/hooks/useFormIds';
import useId from '@lib/hooks/useId';
import { cn } from '@lib/utils';
import { noop } from '@lib/utils';

import {
  EMAIL_SEPARATION_REGEX,
  CUSTOM_STYLES,
  UN_STRICT_EMAIL_REGEX,
} from './constants';
import { MultiEmailInputProps, EmailOption, CounterProps } from './types';
import {
  pruneDuplicates,
  renderValidEmails,
  renderDefaultText,
  getValidEmailsCount,
} from './utils';
import ErrorText from '../common/error-text';
import HelpText from '../common/help-text';

const MultiEmailInput = forwardRef<any, MultiEmailInputProps>(
  (
    {
      disabled = false,
      required = false,
      isAlwaysExpanded = false,
      isCreateable = true,
      label = 'Email(s)',
      placeholder = '',
      helpText = '',
      value = [],
      onChange = noop,
      error = '',
      onBlur = noop,
      filterInvalidEmails,
      counter,
      maxHeight = 200,
      labelProps,
      visibleEmailsCount = 3,
      wrapperClassName = '',
      id: inputId,
      ...otherProps
    },
    ref
  ) => {
    const id = useId(inputId);
    const { formItemId } = useFormIds(id);
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [duplicateEmails, setDuplicateEmails] = useState<string[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const counterProps = counter as CounterProps;
    const isCounterVisible =
      !!counter &&
      (!counterProps.startsFrom ||
        getValidEmailsCount(value) >= counterProps.startsFrom);

    const isOptionsPresent = !!otherProps.options;

    const handleFilterEmails = () => onChange(renderValidEmails(value));

    const handleEmailChange = (inputValue: string) => {
      if (!isCreateable) return;

      const inputValues = inputValue.match(EMAIL_SEPARATION_REGEX);
      const emailMatches =
        inputValue.match(UN_STRICT_EMAIL_REGEX) || inputValues || [];

      const emails = emailMatches.map((email) => ({ value: email }));

      const { uniqueEmails, duplicates } = pruneDuplicates(
        [...value, ...emails],
        otherProps.options as EmailOption[]
      );
      onChange(uniqueEmails);
      setDuplicateEmails(duplicates);
      setInputValue('');
      setIsMenuOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (!inputValue) return;

      switch (event.key) {
        case 'Enter': {
          handleEmailChange(inputValue);
          !isOptionsPresent && event.preventDefault();
          event.stopPropagation();
          return;
        }
        case 'Tab':
        case ',':
        case ' ': {
          handleEmailChange(inputValue);
          event.preventDefault();
          event.stopPropagation();
        }
      }
    };

    const onCreateOption = (input: string) => {
      const { uniqueEmails, duplicates } = pruneDuplicates(
        [...value, { value: input }],
        otherProps.options as EmailOption[]
      );
      onChange(uniqueEmails);
      setDuplicateEmails(duplicates);
      otherProps?.onCreateOption?.(input);
    };

    const handleBlur = (event: React.FocusEvent) => {
      inputValue ? handleEmailChange(inputValue) : onBlur(event);
      setIsFocused(false);
      setDuplicateEmails([]);
    };

    let overrideProps = {};

    if (isOptionsPresent) {
      const isValidNewOption = (
        inputValue: string,
        _: any,
        selectOptions: EmailOption[]
      ) => {
        if (!isCreateable) return false;

        const isInputEmpty = !inputValue.trim();
        const doesInputContainSeparator =
          inputValue.includes(',') || inputValue.includes(' ');

        const isInputPresentInOptions = selectOptions.find(
          (option: EmailOption) => option.value === inputValue.toLowerCase()
        );

        return !(
          isInputEmpty ||
          doesInputContainSeparator ||
          isInputPresentInOptions
        );
      };
      overrideProps = { onCreateOption, isValidNewOption };
    }

    const isFilterEmailsLinkVisible =
      !!filterInvalidEmails && value.length > getValidEmailsCount(value);

    const handleChange = (
      newValue: MultiValue<EmailOption>,
      _actionMeta: ActionMeta<EmailOption>
    ) => {
      onChange(Array.from(newValue));
    };

    return (
      <div className={cn('space-y-1.5', wrapperClassName)}>
        <div className="flex items-center justify-between">
          {label && (
            <Label
              {...{ required }}
              className="flex text-sm leading-none"
              htmlFor={formItemId}
              {...labelProps}
            >
              {label}
            </Label>
          )}
          {isCounterVisible && (
            <p className="text-sm text-muted-foreground">
              {getValidEmailsCount(value)}{' '}
              {counterProps.label
                ? counterProps.label
                : renderDefaultText(getValidEmailsCount(value))}
            </p>
          )}
        </div>
        <CreatableSelect<EmailOption, true, GroupBase<EmailOption>>
          isMulti
          classNamePrefix="select"
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          isDisabled={disabled}
          menuIsOpen={isMenuOpen}
          classNames={{
            container: () => 'shad-ui-select-container',
            control: ({ isDisabled, isFocused }) =>
              cn('shad-ui-select__control shad-ui-select-email__control ', {
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
          styles={
            {
              ...CUSTOM_STYLES,
              control: (base: CSSObjectWithLabel) => ({
                ...base,
                maxHeight: `${maxHeight}px`,
                overflowY: 'auto' as const,
              }),
            } as StylesConfig<EmailOption, true, GroupBase<EmailOption>>
          }
          onBlur={handleBlur}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          onInputChange={(inputValue) => {
            setIsMenuOpen(Boolean(inputValue));
            setInputValue(inputValue);
          }}
          onChange={handleChange}
          {...{
            handleEmailChange,
            inputValue,
            isAlwaysExpanded,
            isFocused,
            placeholder,
            ref,
            value,
            visibleEmailsCount,
            ...(!isOptionsPresent && { menuIsOpen: false }),
            ...otherProps,
            ...overrideProps,
          }}
        />
        {!!error && (
          <div>
            <ErrorText id={id} text={error} />
            {isFilterEmailsLinkVisible && (
              <span
                className="font-semibold cursor-pointer"
                onClick={handleFilterEmails}
              >
                &nbsp;
                {filterInvalidEmails.label
                  ? filterInvalidEmails.label
                  : 'Click here to remove invalid emails.'}
              </span>
            )}
          </div>
        )}
        {!!helpText && <HelpText id={id} text={helpText} />}
        {!!duplicateEmails.length && (
          <ErrorText
            id={id}
            text={`Duplicate emails detected and removed (matched case-insensitively): ${duplicateEmails.join(', ')}`}
          />
        )}
      </div>
    );
  }
);

MultiEmailInput.displayName = 'MultiEmailInput';

export { MultiEmailInput };
