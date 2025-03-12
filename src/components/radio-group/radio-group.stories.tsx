import React from 'react';

import type { Meta } from '@storybook/react';

import { RadioGroup } from './radio-group';
import { RadioGroupProps } from './types';

const meta: Meta<RadioGroupProps> = {
  title: 'Form Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
};

export default meta;

export const Default = (args: RadioGroupProps) => (
  <RadioGroup {...args}>
    <RadioGroup.Item value="1" label="Option 1" />
    <RadioGroup.Item value="2" label="Option 2" />
    <RadioGroup.Item value="3" label="Option 3" />
  </RadioGroup>
);
Default.args = { label: 'RadioGroup label', placeholder: 'Enter text here' };

export const Disabled = (args: RadioGroupProps) => (
  <RadioGroup {...args}>
    <RadioGroup.Item value="1" label="Option 1" />
    <RadioGroup.Item value="2" label="Option 2" />
    <RadioGroup.Item value="3" label="Option 3" />
  </RadioGroup>
);
Disabled.args = { ...Default.args, disabled: true, defaultValue: '1' };

export const HelpText = (args: RadioGroupProps) => (
  <RadioGroup {...args}>
    <RadioGroup.Item value="1" label="Option 1" />
    <RadioGroup.Item value="2" label="Option 2" />
    <RadioGroup.Item value="3" label="Option 3" />
  </RadioGroup>
);
HelpText.args = { ...Default.args, helpText: 'This is some help text.' };

export const Error = (args: RadioGroupProps) => (
  <RadioGroup {...args}>
    <RadioGroup.Item value="1" label="Option 1" />
    <RadioGroup.Item value="2" label="Option 2" />
    <RadioGroup.Item value="3" label="Option 3" />
  </RadioGroup>
);
Error.args = { ...Default.args, error: 'This field is required' };
