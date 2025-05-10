import React from 'react';

import { cva } from 'class-variance-authority';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@base/dialog';
import { cn } from '@lib/utils';

import {
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
} from './types';

const Modal: React.FC<ModalProps> = ({
  children,
  size = 'sm',
  trigger,
  ...props
}) => {
  const sizeVariants = cva('w-3/4', {
    variants: {
      size: {
        sm: 'sm:max-w-xl',
        md: 'sm:max-w-4xl',
        lg: 'sm:max-w-7xl',
      },
    },
  });

  return (
    <Dialog {...props}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        data-testid="shadcn-modal-content"
        className={cn('shadcn-modal-content-wrapper', sizeVariants({ size }))}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

const Header: React.FC<ModalHeaderProps> = ({
  className = '',
  title = '',
  description = '',
  children,
  ...props
}) => {
  const hasDescription = !!description;

  return (
    <DialogHeader
      className={cn(className, 'shadcn-modal-header--wrapper')}
      {...props}
    >
      <DialogTitle
        className={cn({
          'shadcn-modal-header-title': !!title,
          'sr-only': !title,
        })}
      >
        {title || 'Modal title'}
      </DialogTitle>
      <DialogDescription
        className={cn({
          'shadcn-modal-header-description': hasDescription,
          'sr-only': !hasDescription,
        })}
      >
        {description || 'Modal description'}
      </DialogDescription>
      {children}
    </DialogHeader>
  );
};

const Body: React.FC<ModalBodyProps> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={cn(className, 'shadcn-modal-body--wrapper')} {...props}>
    {children}
  </div>
);

const Footer: React.FC<ModalFooterProps> = ({ className = '', ...props }) => (
  <DialogFooter
    className={cn(className, 'shadcn-modal-footer--wrapper')}
    {...props}
  />
);

export { Modal, Header, Body, Footer };
