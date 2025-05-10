import React from 'react';

import { cva } from 'class-variance-authority';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@base/sheet';
import { cn } from '@lib/utils';

import {
  PaneBodyProps,
  PaneFooterProps,
  PaneHeaderProps,
  PaneProps,
} from './types';

const Pane: React.FC<PaneProps> = ({
  children,
  size = 'sm',
  trigger,
  ...props
}) => {
  const sizeVariants = cva('w-3/4', {
    variants: {
      size: {
        sm: 'sm:max-w-md',
        md: 'sm:max-w-2xl',
        lg: 'sm:max-w-5xl',
      },
    },
  });

  return (
    <Sheet {...props}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent
        data-testid="shadcn-pane-content"
        className={cn('shadcn-pane-content-wrapper', sizeVariants({ size }))}
      >
        {children}
      </SheetContent>
    </Sheet>
  );
};

const Header: React.FC<PaneHeaderProps> = ({
  className = '',
  title = '',
  description = '',
  children,
  ...props
}) => (
  <SheetHeader
    className={cn(className, 'shadcn-pane-header--wrapper')}
    {...props}
  >
    {title && (
      <SheetTitle className="shadcn-pane-header-title">{title}</SheetTitle>
    )}
    {description && (
      <SheetDescription className="shadcn-pane-header-description">
        {description}
      </SheetDescription>
    )}
    {children}
  </SheetHeader>
);

const Body: React.FC<PaneBodyProps> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={cn(className, 'shadcn-pane-body--wrapper')} {...props}>
    {children}
  </div>
);

const Footer: React.FC<PaneFooterProps> = ({ className = '', ...props }) => (
  <SheetFooter
    className={cn(className, 'shadcn-pane-footer--wrapper')}
    {...props}
  />
);

export { Pane, Header, Body, Footer };
