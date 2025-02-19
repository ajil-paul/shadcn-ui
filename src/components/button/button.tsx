import React from 'react';
import { Button as BaseButton } from '@base/button';
import type { ButtonProps } from './types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isLoading, loadingText, children, disabled, ...props }, ref) => {
    return (
      <BaseButton ref={ref} disabled={isLoading || disabled} {...props}>
        {isLoading ? loadingText || 'Loading...' : children}
      </BaseButton>
    );
  }
);

Button.displayName = 'Button';
