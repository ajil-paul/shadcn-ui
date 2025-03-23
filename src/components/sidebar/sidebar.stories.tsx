import React from 'react';

import { Sparkles } from 'lucide-react';
import { BrowserRouter } from 'react-router-dom';

import { ArgsTable, Canvas, Story } from '@storybook/blocks';
import type { Meta } from '@storybook/react';

import { MENU_SECTIONS, FOOTER_MENU_SECTIONS } from './constants';
import { MenuItem } from './menu-item';
import { MenuSection } from './menu-section';
import { Sidebar } from './sidebar';
import { SidebarProps } from './types';
import { Typography } from '../typography';

const meta: Meta<SidebarProps> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  subcomponents: {
    MenuSection,
    MenuItem,
  } as Record<string, React.ComponentType<any>>,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <h1>Sidebar</h1>
          <Canvas>
            <Story id="components-sidebar--default" />
          </Canvas>
          <ArgsTable of={Sidebar} />
        </>
      ),
    },
  },
  tags: ['autodocs'],
};

export const Default = (args: SidebarProps) => (
  <BrowserRouter>
    <div className="flex w-full h-screen">
      <Sidebar {...args} />
      <div className="flex flex-col w-full">
        <header className="flex items-center h-16 gap-2 shrink-0">
          <div className="flex items-center gap-2 px-4"></div>
        </header>
        <div className="flex flex-col flex-1 gap-4 p-4 pt-0">
          <div className="grid gap-4 auto-rows-min md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="flex-1 h-full rounded-xl bg-muted/50" />
        </div>
      </div>
    </div>
  </BrowserRouter>
);

Default.args = {
  menuSections: MENU_SECTIONS,
  footerMenuSections: FOOTER_MENU_SECTIONS,
  header: (
    <div className="flex w-full rounded-lg gap-x-4">
      <Sparkles size={22} />
      <Typography type="h4">Sparkles</Typography>
    </div>
  ),
  footer: <div></div>,
};

export default meta;
