import React from 'react';

import type { Meta } from '@storybook/react';

import { TypographyProps } from './types';
import { Typography } from './typography';

const meta: Meta<TypographyProps> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
};

export default meta;

export const Default = (args: TypographyProps) => (
  <div className="w-full">
    <div className="flex w-full gap-3">
      <div className="flex flex-wrap items-start gap-4">
        <Typography {...args}>
          The king's subjects were not amused. They grumbled and complained, but
          the king was firm.
        </Typography>
      </div>
    </div>
  </div>
);

export const Types = () => (
  <div className="w-full">
    <div>
      <Typography type="h1">The Joke Tax Chronicles</Typography>
      <Typography type="body2" className="mt-6">
        Once upon a time, in a far-off land, there was a very lazy king who
        spent all day lounging on his throne. One day, his advisors came to him
        with a problem: the kingdom was running out of money.
      </Typography>
      <Typography type="h2" className="pb-2 mt-10">
        The King's Plan
      </Typography>
      <Typography type="body2" className="leading-7 [&:not(:first-child)]:mt-6">
        The king thought long and hard, and finally came up with{' '}
        <a
          href="#"
          className="font-medium text-indigo-500 underline underline-offset-4"
        >
          a brilliant plan
        </a>
        : he would tax the jokes in the kingdom.
      </Typography>
      <blockquote className="pl-6 mt-6 border-l-2">
        <Typography type="body1" className="italic">
          "After all," he said, "everyone enjoys a good joke, so it's only fair
          that they should pay for the privilege."
        </Typography>
      </blockquote>
      <Typography type="h3" className="mt-8">
        The Joke Tax
      </Typography>
      <Typography type="body2">
        The king's subjects were not amused. They grumbled and complained, but
        the king was firm:
      </Typography>
      <Typography type="h4" className="mt-8">
        Jokester's Revolt
      </Typography>
      <Typography type="body3" className="mt-2">
        Jokester began sneaking into the castle in the middle of the night and
        leaving jokes all over the place: under the king's pillow, in his soup,
        even in the royal toilet. The king was furious, but he couldn't seem to
        stop Jokester.
      </Typography>
    </div>
  </div>
);
