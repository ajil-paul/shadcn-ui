import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { Meta, StoryFn } from '@storybook/react';

import { Breadcrumb } from './breadcrumb';
import { BreadcrumbProps } from './types';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta<typeof Breadcrumb>;

const Template: StoryFn<typeof Breadcrumb> = (args: BreadcrumbProps) => (
  <Breadcrumb {...args} />
);

export const Default = Template.bind({});
Default.args = {
  items: [
    { path: '/', name: 'Home' },
    { path: '/products', name: 'Products' },
    { path: '/products/1', name: 'Product 1' },
  ],
};
