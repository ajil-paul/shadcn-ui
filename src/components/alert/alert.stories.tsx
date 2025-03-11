import React, { useState } from 'react';

import type { Meta } from '@storybook/react';

import { Alert, AlertProps } from '../alert';
import { Button } from '../button/button';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
};

export default meta;

export const Default = (args: AlertProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState(args.isOpen);

  return (
    <div className="w-full">
      <div className="flex justify-center w-full gap-3">
        <Button onClick={() => setIsAlertOpen(true)} label="Show alert" />
        <Alert
          {...args}
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          onAction={() => console.log('Item deleted')}
        />
      </div>
    </div>
  );
};

Default.args = {
  isOpen: false,
  title: 'Delete item?',
  description: 'Are you sure you want to delete this item?',
  actionLabel: 'Continue',
  cancelLabel: 'Cancel',
};

Default.parameters = {
  docs: {
    source: {
      transform: (code: string, storyContext: StoryContext) => {
        const { args } = storyContext;

        return `
const Default = (args) => {
  const [isAlertOpen, setIsAlertOpen] = useState(${Default.args.isOpen});

  return (
    <div className="w-full">
      <div className="flex justify-center w-full gap-3">
        <Button onClick={() => setIsAlertOpen(true)} label="Show alert" />
        <Alert
          isOpen={isAlertOpen}
          title="${args.title}"
          description="${args.description}"
          actionLabel="${args.actionLabel}"
          cancelLabel="${args.cancelLabel}"
          onClose={() => setIsAlertOpen(false)}
          onAction={() => console.log("Item deleted")}
        />
      </div>
    </div>
  );
};`;
      },
    },
  },
};

export const WithTrigger = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center w-full gap-3">
        <Alert
          triggerButtonProps={{ label: 'Show alert' }}
          title="Delete item?"
          description="Are you sure you want to delete this item?"
          onAction={() => console.log('Item deleted')}
        />
      </div>
    </div>
  );
};
