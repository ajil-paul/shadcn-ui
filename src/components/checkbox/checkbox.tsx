import React from 'react';

import { Checkbox as ShadCheckbox } from '@base/checkbox';
import { Label } from '@base/label';
import useFormIds from '@lib/hooks/useFormIds';
import useId from '@lib/hooks/useId';
import { cn } from '@lib/utils';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { CheckboxProps } from './types';
import ErrorText from '../common/error-text';
import HelpText from '../common/help-text';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      wrapperClassName = '',
      label,
      helpText,
      id: inputId,
      error,
      ...otherProps
    },
    ref
  ) => {
    const id = useId(inputId);
    const { formItemId } = useFormIds(id);

    return (
      <div className={cn('flex space-x-2 items-top', wrapperClassName)}>
        <ShadCheckbox ref={ref} id={formItemId} {...otherProps} />
        <div className="grid gap-1.5 leading-none">
          {!!label && (
            <Label className="flex text-sm leading-none" htmlFor={formItemId}>
              {label}
            </Label>
          )}
          {!!helpText && <HelpText id={id} text={helpText} />}
          {!!error && <ErrorText id={id} text={error} />}
        </div>
      </div>
    );
  }
);

export { Checkbox };
