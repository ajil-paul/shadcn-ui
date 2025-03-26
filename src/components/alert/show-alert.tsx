import React, { useState } from 'react';

import { createRoot } from 'react-dom/client';

import { Alert } from './alert';
import { ShowAlertProps } from './types';

export function showAlert({
  title = '',
  description = '',
  loading = false,
  actionLabel = 'Continue',
  cancelLabel = 'Cancel',
  onContinue = async () => {},
  onClose = () => {},
}: ShowAlertProps): void {
  // Create a container div for alert
  const alertContainer = document.createElement('div');
  document.body.appendChild(alertContainer);

  // Function to close and remove alert
  const closeAlert = (
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  ): void => {
    setIsOpen(false);
    setTimeout(() => {
      root.unmount();
      document.body.removeChild(alertContainer);
    }, 300);
  };

  // Mounting the alert dynamically
  const root = createRoot(alertContainer);
  const AlertComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isLoading, setLoading] = useState(loading);

    return (
      <Alert
        isOpen={isOpen}
        isLoading={isLoading}
        title={title}
        description={description}
        actionLabel={actionLabel}
        cancelLabel={cancelLabel}
        onClose={() => {
          onClose();
          closeAlert(setIsOpen);
        }}
        onAction={async () => {
          setLoading(true);
          await onContinue?.();
          closeAlert(setIsOpen);
        }}
      />
    );
  };

  root.render(<AlertComponent />);
}
