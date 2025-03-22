import React from 'react';

import { Label } from '@base/label';
import { RadioGroupItem as ShadRadioGroupItem } from '@base/radio-group';
import useFormIds from '@lib/hooks/useFormIds';
import useId from '@lib/hooks/useId';
import { cn } from '@lib/utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { RadioGroupItemProps, RadioGroupProps } from './types';
import ErrorText from '../common/error-text';
import HelpText from '../common/help-text';

interface RadioGroupComponent
  extends React.ForwardRefExoticComponent<RadioGroupProps> {
  Item: typeof RadioGroupItem;
}

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  (
    { label, id: defaultId, labelAlign = 'end', ...props }: RadioGroupItemProps,
    ref
  ) => {
    const id = useId(defaultId);

    return (
      <div
        className={cn('flex items-center space-x-2', {
          'flex-row-reverse': labelAlign === 'start',
        })}
      >
        <ShadRadioGroupItem ref={ref} {...props} id={id} />
        {!!label && (
          <Label htmlFor={id} className="shad-ui-radio-group-item-label">
            {label}
          </Label>
        )}
      </div>
    );
  }
);

const RadioGroup = React.forwardRef(
  (
    {
      className,
      wrapperClassName,
      label,
      helpText,
      error,
      id: inputId,
      ...props
    },
    ref
  ) => {
    const id = useId(inputId);
    const { formItemId } = useFormIds(id);

    return (
      <div className={cn('space-y-2', wrapperClassName)}>
        {!!label && (
          <Label className="flex text-sm leading-none" htmlFor={formItemId}>
            {label}
          </Label>
        )}
        <RadioGroupPrimitive.Root
          ref={ref}
          className={cn('grid gap-2 shad-ui-radio-group', className)}
          {...props}
        />
        {!!helpText && <HelpText id={id} text={helpText} />}
        {!!error && <ErrorText id={id} text={error} />}
      </div>
    );
  }
) as RadioGroupComponent;

RadioGroup.Item = RadioGroupItem;

export { RadioGroup };
