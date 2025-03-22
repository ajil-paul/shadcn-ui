import React from 'react';

import type { Meta } from '@storybook/react';

import { Switch } from './switch';
import { SwitchProps } from './types';
import { Label } from '../label/label';

const meta: Meta<typeof Switch> = {
  title: 'Form Components/Switch',
  component: Switch,
  tags: ['autodocs'],
};

export default meta;

export const Default = (args: SwitchProps) => (
  <div className="flex items-center space-x-2">
    <Switch id="airplane-mode-1" {...args} />
    <Label htmlFor="airplane-mode-1">Airplane Mode</Label>
  </div>
);

export const Disabled = (args: SwitchProps) => (
  <div className="flex items-center space-x-2">
    <Switch id="airplane-mode-2" {...args} />
    <Label htmlFor="airplane-mode-2">Airplane Mode</Label>
  </div>
);
Disabled.args = { disabled: true };
