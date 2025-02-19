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
      href,
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
            disabled={loading || disabled}
            className={buttonClassName}
            variant={otherProps.variant || 'link'}
            ref={ref}
            {...otherProps}
          >
            {loading
              ? renderIcon(Loader2, { className: 'w-4 h-4 animate-spin' })
              : renderIcon(icon)}
            {renderLabel(label)}
          </BaseButton>
        </Link>
      );

    return (
      <BaseButton
        disabled={loading || disabled}
        ref={ref}
        className={buttonClassName}
        {...otherProps}
      >
        {loading
          ? renderIcon(Loader2, { className: 'w-4 h-4 animate-spin' })
          : renderIcon(icon)}
        {renderLabel(label)}
      </BaseButton>
    );
  }
);

Button.displayName = 'Button';
