import React from 'react';

import { Sparkle } from 'lucide-react';
import { BrowserRouter } from 'react-router-dom';

import type { Meta } from '@storybook/react';

import { Button } from './button';
import { ButtonProps } from './types';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

export const Default = (args: ButtonProps) => (
  <Button {...args} label="Default" />
);

export const Styles = (args: ButtonProps) => (
  <div className="flex w-full gap-3">
    <Button {...args} label="Default" variant="default" />
    <Button {...args} label="Secondary" variant="secondary" />
    <Button {...args} label="Destructive" variant="destructive" />
    <Button {...args} label="Outline" variant="outline" />
    <Button {...args} label="Ghost" variant="ghost" />
    <Button {...args} label="Link" variant="link" />
  </div>
);

export const Sizes = (args: ButtonProps) => (
  <div className="flex w-full gap-3">
    <Button {...args} label="Small" size="sm" />
    <Button {...args} label="Medium" size="default" />
    <Button {...args} label="Large" size="lg" />
  </div>
);

export const Link = (args: ButtonProps) => (
  <BrowserRouter>
    <Button {...args} label="Default" />
  </BrowserRouter>
);

export const IconButton = (args: ButtonProps) => (
  <BrowserRouter>
    <div className="flex w-full gap-3">
      <Button {...args} icon={Sparkle} label="Default" />
      <Button {...args} icon={<Sparkle size={16} />} />
    </div>
  </BrowserRouter>
);
