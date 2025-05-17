import React from 'react';

import { DateRange } from 'react-day-picker';

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

export const Multiple = (args: typeof Calendar) => {
  const [dates, setDates] = React.useState<Date[] | undefined>([]);

  return (
    <div>
      <Calendar
        {...args}
        defaultMonth={dates?.[0]}
        selected={dates}
        onSelect={setDates}
        className="border rounded-lg"
      />
      <div className="mt-6 text-sm">
        Selected dates:{' '}
        {dates?.map((date) => date.toLocaleDateString()).join(', ')}
      </div>
    </div>
  );
};

Multiple.args = {
  yearRange: 20,
  mode: 'multiple',
};

export const Range = (args: typeof Calendar) => {
  const [dates, setDates] = React.useState<DateRange | undefined>();

  return (
    <div>
      <Calendar
        {...args}
        defaultMonth={dates?.[0]}
        selected={dates}
        onSelect={setDates}
        className="border rounded-lg"
      />
      <div className="mt-6 text-sm">
        <div>From: {dates?.from?.toLocaleDateString()}</div>
        <div>To: {dates?.to?.toLocaleDateString()}</div>
      </div>
    </div>
  );
};

Range.args = {
  yearRange: 20,
  mode: 'range',
};
