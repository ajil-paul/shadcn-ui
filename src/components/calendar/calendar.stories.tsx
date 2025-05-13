import React from 'react';

import type { Meta } from '@storybook/react';

import { Calendar } from '.';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
};

export default meta;

export const Default = (args: typeof Calendar) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      {...args}
      mode="single"
      defaultMonth={date}
      selected={date}
      onSelect={setDate}
      className="border rounded-lg"
    />
  );
};

Default.args = {
  yearRange: 20,
};
