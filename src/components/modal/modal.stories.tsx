import React from 'react';

import type { Meta } from '@storybook/react';

import { ModalProps } from './types';
import { Button } from '../button';
import { Input } from '../input';

import { Modal } from '.';

const { Header, Body, Footer } = Modal;

const meta: Meta<ModalProps> = {
  title: 'Overlays/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;

export const Default = (args: ModalProps) => (
  <Modal {...args}>
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
  </Modal>
);

Default.args = {
  size: 'sm',
  trigger: <Button label="Open modal" />,
};

export const Sizes = () => (
  <div className="space-x-4">
    <Modal trigger={<Button label="Small" />} size="sm">
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
    </Modal>
    <Modal trigger={<Button label="Medium" />} size="md">
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
    </Modal>
    <Modal trigger={<Button label="Large" />} size="lg">
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
    </Modal>
  </div>
);
