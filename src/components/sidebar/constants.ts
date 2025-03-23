import {
  SquareTerminal,
  Bot,
  BookOpen,
  Settings2,
  Frame,
  PieChart,
  Map,
  LifeBuoy,
  Send,
} from 'lucide-react';

import { MenuSectionProps } from './types';

export const MENU_ITEMS = [
  {
    key: 'playground',
    title: 'Playground',
    icon: SquareTerminal,
    isActive: true,
    children: [
      { key: 'history', title: 'History', path: '#' },
      { key: 'starred', title: 'Starred', path: '#' },
      { key: 'settings', title: 'Settings', path: '#' },
    ],
  },
  {
    key: 'models',
    title: 'Models',
    icon: Bot,
    children: [
      { key: 'genesis', title: 'Genesis', path: '#' },
      { key: 'explorer', title: 'Explorer', path: '#' },
      { key: 'quantum', title: 'Quantum', path: '#' },
    ],
  },
  {
    key: 'documentation',
    title: 'Documentation',
    icon: BookOpen,
    children: [
      { key: 'introduction', title: 'Introduction', path: '#' },
      { key: 'get-started', title: 'Get Started', path: '#' },
      { key: 'tutorials', title: 'Tutorials', path: '#' },
      { key: 'changelog', title: 'Changelog', path: '#' },
    ],
  },
  {
    key: 'settings',
    title: 'Settings',
    path: '/',
    icon: Settings2,
  },
];

export const MENU_SECTIONS = [
  {
    key: 'platform',
    title: 'Platform',
    items: MENU_ITEMS,
  },
  {
    key: 'projects',
    title: 'Projects',
    items: [
      {
        key: 'design-engineering',
        title: 'Design Engineering',
        path: '#',
        icon: Frame,
      },
      {
        key: 'sales-marketing',
        title: 'Sales & Marketing',
        path: '#',
        icon: PieChart,
      },
      { key: 'travel', title: 'Travel', path: '#', icon: Map },
    ],
  },
] as MenuSectionProps[];

export const FOOTER_MENU_SECTIONS = [
  {
    key: 'support',
    className: 'mt-auto',
    items: [
      {
        key: 'support',
        title: 'Support',
        path: '#',
        icon: LifeBuoy,
        size: 'sm',
      },
      { key: 'feedback', title: 'Feedback', path: '#', icon: Send, size: 'sm' },
    ],
  },
] as MenuSectionProps[];
