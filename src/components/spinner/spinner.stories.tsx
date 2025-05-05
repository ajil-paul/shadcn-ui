import React from 'react';

import type { Meta } from '@storybook/react';

import { Spinner } from './spinner';
import { SpinnerProps } from './types';

const meta: Meta<SpinnerProps> = {
  title: 'Components/Spinner',
  tags: ['autodocs'],
  component: Spinner,
};

export default meta;

export const Default = (args: SpinnerProps) => <Spinner {...args} />;

Default.args = { size: 20 };
