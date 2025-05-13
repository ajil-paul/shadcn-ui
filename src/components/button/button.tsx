import React from 'react';

import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button as BaseButton } from '@base/button';
import { cn, renderIcon, renderLabel } from '@lib/utils';

import type { ButtonProps } from './types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      loading = false,
      disabled = false,
      label,
      to,
      icon,
      iconPosition = 'left',
      ...otherProps
    },
    ref
  ) => {
    const buttonClassName = cn(otherProps.className, {
      'flex-row-reverse': iconPosition === 'right',
    });

    if (to)
      return (
        <Link to={to}>
          <BaseButton
            ref={ref}
            className={buttonClassName}
            disabled={loading || disabled}
            variant={otherProps.variant || 'default'}
            {...otherProps}
          >
            {loading
              ? renderIcon(Loader2, {
                  className: 'w-4 h-4 animate-spin',
                  'data-testid': 'loading-spinner',
                })
              : renderIcon(icon)}
            {renderLabel(label)}
          </BaseButton>
        </Link>
      );

    return (
      <BaseButton
        ref={ref}
        className={buttonClassName}
        disabled={loading || disabled}
        {...otherProps}
      >
        {loading
          ? renderIcon(Loader2, {
              className: 'w-4 h-4 animate-spin',
              'data-testid': 'loading-spinner',
            })
          : renderIcon(icon)}
        {renderLabel(label)}
      </BaseButton>
    );
  }
);

Button.displayName = 'Button';
