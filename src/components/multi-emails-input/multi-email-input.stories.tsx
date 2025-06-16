import React from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { MultiEmailInput } from './multi-email-input';
import { EmailOption } from './types';

const meta: Meta<typeof MultiEmailInput> = {
  title: 'Form Components/MultiEmailInput',
  component: MultiEmailInput,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helpText: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    isCreateable: { control: 'boolean' },
    isAlwaysExpanded: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof MultiEmailInput>;

const defaultArgs = {
  label: 'Email(s)',
  placeholder: 'Enter email addresses',
};

export const Default: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [emails, setEmails] = useState<EmailOption[]>([]);

    return <MultiEmailInput {...args} value={emails} onChange={setEmails} />;
  },
  args: defaultArgs,
};

export const WithError: Story = {
  args: {
    ...defaultArgs,
    error: 'Please enter valid email addresses.',
    filterInvalidEmails: {
      label: 'Remove invalid emails',
    },
  },
};

export const WithCounter: Story = {
  args: {
    ...defaultArgs,
    counter: {
      label: 'valid emails',
      startsFrom: 0,
    },
  },
};

export const WithOptions: Story = {
  args: {
    ...defaultArgs,
    options: [
      { value: 'john@example.com', label: 'John Doe' },
      { value: 'jane@example.com', label: 'Jane Smith' },
      { value: 'bob@example.com', label: 'Bob Johnson' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    disabled: true,
    value: [
      { value: 'john@example.com', label: 'John Doe' },
      { value: 'jane@example.com', label: 'Jane Smith' },
    ],
  },
};

export const Required: Story = {
  args: { ...defaultArgs, required: true },
};

export const NotCreateable: Story = {
  args: {
    ...defaultArgs,
    isCreateable: false,
    options: [
      { value: 'john@example.com', label: 'John Doe' },
      { value: 'jane@example.com', label: 'Jane Smith' },
      { value: 'bob@example.com', label: 'Bob Johnson' },
    ],
  },
};

export const AlwaysExpanded: Story = {
  args: {
    ...defaultArgs,
    isAlwaysExpanded: true,
    value: [
      { value: 'john@example.com', label: 'John Doe' },
      { value: 'jane@example.com', label: 'Jane Smith' },
      { value: 'bob@example.com', label: 'Bob Johnson' },
      { value: 'alice@example.com', label: 'Alice Brown' },
      { value: 'charlie@example.com', label: 'Charlie Wilson' },
    ],
  },
};
