import React, { useEffect, useState } from 'react';

import clsx from 'clsx';

import useFormIds from '@lib/hooks/useFormIds';
import useId from '@lib/hooks/useId';
import useSyncedRef from '@lib/hooks/useSyncedRef';
import { cn } from '@lib/utils';

import { TextareaProps } from './types';
import ErrorText from '../common/error-text';
import HelpText from '../common/help-text';
import { Label } from '../label/label';

const SIZES = { sm: 'sm', md: 'md', lg: 'lg' };

const ROWS: Record<string, number> = { sm: 1, md: 3, lg: 4 };

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className = '',
      size = SIZES.md,
      disabled,
      label,
      isNaked,
      error,
      helpText,
      maxLength,
      labelClassName,
      id: inputId,
      unlimitedChars = false,
      defaultValue,
      onBlur,
      ...otherProps
    },
    ref
  ) => {
    const defaultValueInternal = otherProps.value ?? defaultValue;
    const [valueInternal, setValueInternal] = useState(defaultValueInternal);
    const id = useId(inputId);
    const { formItemId, formDescriptionId, formMessageId } = useFormIds(id);
    const textareaRef = useSyncedRef(ref);

    const textareaClass = cn(
      'shad-cn-input-container shad-cn-textarea-container',
      {
        'shad-cn-textarea-container--disabled': disabled,
        'shad-cn-input-container--destructive': !!error,
        'shad-cn-textarea-container--naked': !!isNaked,
      }
    );

    const value = otherProps.value ?? valueInternal ?? '';

    const onChangeInternal = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setValueInternal(e.target.value);

    const onChange = otherProps.onChange ?? onChangeInternal;
    const isMaxLengthPresent = !!maxLength || maxLength === 0;

    useEffect(() => {
      if (!textareaRef.current) return;

      const scrollPosition = window.scrollY;
      textareaRef.current.style.minHeight = '22px';
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight + 1}px`;
      window.scrollTo(0, scrollPosition);
    }, [value]);

    const handleTrimmedChangeOnBlur = (
      e: React.FocusEvent<HTMLTextAreaElement>
    ) => {
      if (typeof value !== 'string') return;

      const trimmedValue = value.trim();
      if (value === trimmedValue) return;

      e.target.value = trimmedValue;
      onChange(e);
    };

    const handleOnBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      handleTrimmedChangeOnBlur(e);
      onBlur?.(e);
    };

    return (
      <div className={cn('space-y-1.5', className)}>
        {!!label && (
          <Label
            className={clsx(labelClassName, 'flex text-sm leading-none')}
            htmlFor={formItemId}
          >
            {label}
          </Label>
        )}
        <div className={textareaClass}>
          <textarea
            id={formItemId}
            className="w-full bg-transparent focus-visible:outline-none disabled:cursor-not-allowed"
            ref={textareaRef}
            style={{ maxHeight: '224px' }}
            rows={ROWS[size]}
            {...otherProps}
            {...{
              disabled,
              ...(isMaxLengthPresent && !unlimitedChars && { maxLength }),
              onChange,
              value,
            }}
            onBlur={handleOnBlur}
            aria-describedby={
              !error
                ? formDescriptionId
                : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
          />
        </div>
        {!!helpText && <HelpText id={id} text={helpText} />}
        {!!error && <ErrorText id={id} text={error} />}
      </div>
    );
  }
);

export { Textarea };
