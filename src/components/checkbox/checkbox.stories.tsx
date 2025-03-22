import React from 'react';

import type { Meta } from '@storybook/react';

import { Checkbox } from './checkbox';
import { CheckboxProps } from './types';

const meta: Meta<CheckboxProps> = {
  title: 'Form Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;

export const Default = (args: CheckboxProps) => <Checkbox {...args} />;
Default.args = {
  label: 'Checkbox label',
};

export const Disabled = (args: CheckboxProps) => <Checkbox {...args} />;
Disabled.args = {
  ...Default.args,
  disabled: true,
  defaultValue: 'Disabled input',
};

export const HelpText = (args: CheckboxProps) => <Checkbox {...args} />;
HelpText.args = { ...Default.args, helpText: 'This is some help text.' };

export const Error = (args: CheckboxProps) => <Checkbox {...args} />;
Error.args = { ...Default.args, error: 'This field is required' };
