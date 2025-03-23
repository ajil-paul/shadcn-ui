import '../src/styles/globals.css';

import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';

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
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
