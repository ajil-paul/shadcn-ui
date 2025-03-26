import React from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@base/alert-dialog';
import { Button } from '@components/button';

import { AlertProps } from './types';

const Alert: React.FC<AlertProps> = ({
  isOpen = false,
  isLoading = false,
  title,
  description,
  actionLabel = 'Continue',
  cancelLabel = 'Cancel',
  triggerButtonProps,
  onAction = () => {},
  onClose = () => {},
}) => (
  <AlertDialog
    {...(!triggerButtonProps && { open: isOpen })}
    onOpenChange={(isOpen) => !isOpen && onClose()}
  >
    {triggerButtonProps && (
      <AlertDialogTrigger asChild>
        <Button {...triggerButtonProps} />
      </AlertDialogTrigger>
    )}
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel disabled={isLoading}>
          {cancelLabel}
        </AlertDialogCancel>
        <Button
          variant="destructive"
          onClick={onAction}
          loading={isLoading}
          label={actionLabel}
        />
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

Alert.displayName = 'Alert';

export { Alert };
