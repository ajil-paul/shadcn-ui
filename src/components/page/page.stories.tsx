import React from 'react';

import type { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Examples/Page',
  tags: ['autodocs'],
};

export default meta;

export const Default = () => (
  <iframe
    src="https://codesandbox.io/p/devbox/ajil-paul-shadcn-ui-page-example-vjsqg6?embed=1&file=%2Fsrc%2FApp.jsx"
    style={{
      width: '100%',
      height: '500px',
      border: '0',
      borderRadius: '4px',
      overflow: 'hidden',
    }}
    title="@ajil-paul/shadcn-ui-page-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
);
