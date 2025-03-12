import React from 'react';

import type { Meta } from '@storybook/react';

import { Input } from './input';
import { InputProps } from './types';

const meta: Meta<typeof Input> = {
  title: 'Form Components/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;

export const Default = (args: InputProps) => <Input {...args} />;
Default.args = {
  label: 'Input label',
  placeholder: 'Enter text here',
};

export const Disabled = (args: InputProps) => <Input {...args} />;
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const PrefixAndSuffix = (args: InputProps) => <Input {...args} />;
PrefixAndSuffix.args = {
  ...Default.args,
  prefix: 'www.',
  suffix: '.shad-cn.com',
};

export const Sizes = (args: InputProps) => (
  <div className="flex flex-col gap-y-4">
    <Input {...args} size="sm" />
    <Input {...args} size="md" />
    <Input {...args} size="lg" />
  </div>
);
Sizes.args = Default.args;

export const HelpText = (args: InputProps) => <Input {...args} />;
HelpText.args = { ...Default.args, helpText: 'This is some help text.' };

export const Error = (args: InputProps) => <Input {...args} />;
Error.args = { ...Default.args, error: 'This field is required' };

export const NakedInput = (args: InputProps) => <Input {...args} />;
NakedInput.args = { ...Default.args, isNaked: true };
