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
      className,
      label,
      to,
      icon,
      iconPosition = 'left',
      href,
      ...otherProps
    },
    ref
  ) => {
    const buttonClassName = cn(
      className,
      iconPosition === 'right' && 'flex-row-reverse justify-between'
    );

    const renderBaseButton = () => (
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
    );

    if (to) return <Link to={to}>{renderBaseButton()}</Link>;

    if (!!href) return <a href={href}>{renderBaseButton()}</a>;

    return renderBaseButton();
  }
);

Button.displayName = 'Button';
