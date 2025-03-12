import React from 'react';

import { Label } from '@base/label';
import useFormIds from '@lib/hooks/useFormIds';
import useId from '@lib/hooks/useId';
import { cn } from '@lib/utils';

import { InputProps } from './types';
import ErrorText from '../common/error-text';
import HelpText from '../common/help-text';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      size = 'md',
      disabled,
      suffix,
      prefix,
      label,
      isNaked,
      error,
      helpText,
      labelClassName,
      id: inputId,
      ...props
    },
    ref
  ) => {
    const id = useId(inputId);
    const { formItemId, formDescriptionId, formMessageId } = useFormIds(id);

    const inputClass = cn(className, 'shad-cn-input-container', {
      'shad-cn-input-container--sm': size === 'sm',
      'shad-cn-input-container--md': size === 'md',
      'shad-cn-input-container--lg': size === 'lg',
      'shad-cn-input-container--disabled': disabled,
      'shad-cn-input-container--destructive': !!error,
      'shad-cn-input-container--naked': !!isNaked,
    });

    const labelClass = cn(labelClassName, 'flex', {
      'text-xs leading-none': size === 'sm',
      'text-sm leading-none': size === 'md',
    });

    return (
      <div className={cn('space-y-1.5', className)}>
        {!!label && (
          <Label className={labelClass} htmlFor={formItemId}>
            {label}
          </Label>
        )}

        <div className={inputClass} aria-disabled>
          {prefix && (
            <div className="flex items-center flex-shrink-0 h-full pointer-events-none">
              {prefix}
            </div>
          )}
          <input
            id={formItemId}
            className="w-full h-full bg-transparent focus-visible:outline-none disabled:cursor-not-allowed"
            ref={ref}
            disabled={disabled}
            aria-describedby={
              !error
                ? formDescriptionId
                : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            {...props}
          />
          {suffix && (
            <div className="flex items-center flex-shrink-0 h-full pointer-events-none">
              {suffix}
            </div>
          )}
        </div>
        {!!helpText && <HelpText id={id} text={helpText} />}
        {!!error && <ErrorText id={id} text={error} />}
      </div>
    );
  }
);
export { Input };
