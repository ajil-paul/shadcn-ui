import React from 'react';

import type { Meta } from '@storybook/react';

import { PaneProps } from './types';
import { Button } from '../button';
import { Input } from '../input';

import { Pane } from '.';

const { Header, Body, Footer } = Pane;

const meta: Meta<PaneProps> = {
  title: 'Components/Pane',
  component: Pane,
  tags: ['autodocs'],
};

export default meta;

export const Default = (args: PaneProps) => (
  <Pane {...args}>
    <Header
      title="Edit user"
      description="Update the details of the user here."
    />
    <Body className="space-y-2">
      <Input label="First Name" />
    </Body>
    <Footer>
      <Button label="Save changes" />
      <Button variant="ghost" label="Cancel" />
    </Footer>
  </Pane>
);

Default.args = {
  size: 'sm',
  trigger: <Button label="Open pane" />,
};

export const Sizes = () => (
  <div className="space-x-4">
    <Pane trigger={<Button label="Small" />} size="sm">
      <Header
        title="Edit user"
        description="Update the details of the user here."
      />
      <Body className="space-y-2">
        <Input label="First Name" />
      </Body>
      <Footer>
        <Button label="Save changes" />
        <Button variant="ghost" label="Cancel" />
      </Footer>
    </Pane>
    <Pane trigger={<Button label="Medium" />} size="md">
      <Header
        title="Edit user"
        description="Update the details of the user here."
      />
      <Body className="space-y-2">
        <Input label="First Name" />
      </Body>
      <Footer>
        <Button label="Save changes" />
        <Button variant="ghost" label="Cancel" />
      </Footer>
    </Pane>
    <Pane trigger={<Button label="Large" />} size="lg">
      <Header
        title="Edit user"
        description="Update the details of the user here."
      />
      <Body className="space-y-2">
        <Input label="First Name" />
      </Body>
      <Footer>
        <Button label="Save changes" />
        <Button variant="ghost" label="Cancel" />
      </Footer>
    </Pane>
  </div>
);
