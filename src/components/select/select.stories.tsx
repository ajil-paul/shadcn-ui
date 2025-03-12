import React from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import { Select } from './select';
import { SelectProps } from './types';

const meta: Meta<typeof Select> = {
  title: 'Form Components/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<SelectProps> = (args) => (
  <div className="flex justify-start min-h-44">
    <Select {...args} className="w-64" />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Select label',
  placeholder: 'Select an option',
  options: [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ],
};

export const Disabled = Template.bind({});
Disabled.args = { ...Default.args, isDisabled: true };

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  ...Default.args,
  isMulti: true,
};

export const FixedPosition = Template.bind({});
FixedPosition.args = { ...Default.args, strategy: 'fixed' };

export const HelpText = Template.bind({});
HelpText.args = { ...Default.args, helpText: 'This is some help text.' };

export const Error = Template.bind({});
Error.args = { ...Default.args, error: 'This field is required' };
