import React from 'react';

import type { Meta } from '@storybook/react';

import { Tag, TagProps } from '.';

const meta: Meta<TagProps> = {
  title: 'Components/Tag',
  tags: ['autodocs'],
  component: Tag,
};

export default meta;

export const Default = (args: TagProps) => <Tag {...args}>Badge</Tag>;

Default.args = { variant: 'default' };

export const Secondary = (args: TagProps) => <Tag {...args}>Secondary</Tag>;

Secondary.args = { variant: 'secondary' };

export const Outline = (args: TagProps) => <Tag {...args}>Outline</Tag>;

Outline.args = { variant: 'outline' };

export const Destructive = (args: TagProps) => <Tag {...args}>Destructive</Tag>;

Destructive.args = { variant: 'destructive' };
