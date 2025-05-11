import React from 'react';

import type { Meta } from '@storybook/react';

import { Button } from '../button';

import { toast, Toaster } from '.';

const meta: Meta<typeof Toaster> = {
  title: 'Overlays/Toaster',
  component: Toaster,
  tags: ['autodocs'],
};

export default meta;

export const Default = () => {
  return (
    <div className="flex items-center space-x-2">
      <Toaster richColors closeButton />
      <Button
        label="Success toast"
        onClick={() => toast.success('Event has been created')}
      />
      <Button
        label="Error toast"
        onClick={() =>
          toast.error('Event has not been created', { duration: 30000 })
        }
      />
      <Button
        label="Info toast"
        onClick={() =>
          toast.info('Be at the area 10 minutes before the event time', {
            duration: 30000,
          })
        }
      />
      <Button
        label="Warning toast"
        onClick={() =>
          toast.warning('Event start time cannot be earlier than 8am', {
            duration: 30000,
          })
        }
      />
    </div>
  );
};
