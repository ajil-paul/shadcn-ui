import React from 'react';
import { themes } from '@storybook/theming';
import type { Preview } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import '../src/index.css';

const preview: Preview = {
  parameters: {
    darkMode: {
      dark: {
        ...themes.dark,
        appBg: '#09090b',
        appContentBg: '#09090b',
        appPreviewBg: '#09090b',
      },
      light: {
        ...themes.normal,
        appBg: '#ffffff',
        appContentBg: '#ffffff',
        appPreviewBg: '#ffffff',
      },
      classTarget: 'html',
      stylePreview: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default preview;
