import React from 'react';

import type { Meta } from '@storybook/react';

import { Label } from './label';
import { LabelProps } from './types';

const meta: Meta<typeof Label> = {
  title: 'Form Components/Label',
  component: Label,
  tags: ['autodocs'],
};

export default meta;

export const Default = (args: LabelProps) => (
  <div className="flex items-center space-x-2">
    <Label htmlFor="airplane-mode-1" {...args}>
      Airplane Mode
    </Label>
  </div>
);
