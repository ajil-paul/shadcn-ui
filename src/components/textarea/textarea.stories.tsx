import React from 'react';

import type { Meta } from '@storybook/react';

import { Textarea, TextareaProps } from '../textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Form Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
};

export default meta;

export const Default = (args: TextareaProps) => <Textarea {...args} />;
Default.args = {
  label: 'Enter description',
  placeholder: 'Enter description here',
};

export const Disabled = (args: TextareaProps) => <Textarea {...args} />;
Disabled.args = {
  ...Default.args,
  disabled: true,
  defaultValue: 'Disabled input',
};

export const PrefixAndSuffix = (args: TextareaProps) => <Textarea {...args} />;
PrefixAndSuffix.args = {
  ...Default.args,
  prefix: 'www.',
  suffix: '.shad-cn.com',
};

export const Sizes = (args: TextareaProps) => (
  <div className="flex flex-col gap-y-4">
    <Textarea {...args} size="sm" />
    <Textarea {...args} size="md" />
    <Textarea {...args} size="lg" />
  </div>
);
Sizes.args = Default.args;

export const HelpText = (args: TextareaProps) => <Textarea {...args} />;
HelpText.args = { ...Default.args, helpText: 'This is some help text.' };

export const Error = (args: TextareaProps) => <Textarea {...args} />;
Error.args = { ...Default.args, error: 'This field is required' };

export const NakedTextarea = (args: TextareaProps) => <Textarea {...args} />;
NakedTextarea.args = { ...Default.args, isNaked: true };
