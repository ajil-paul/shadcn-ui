import React from 'react';

import { DateRange } from 'react-day-picker';

import type { Meta } from '@storybook/react';

import { DatePicker, DatePickerProps } from '.';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
};

export default meta;

export const Default = (args) => {
  const [date, setDate] = React.useState<Date>(new Date());

  return (
    <DatePicker
      {...args}
      defaultMonth={date}
      selected={date}
      onSelect={setDate}
    />
  );
};

Default.args = {
  yearRange: 20,
  disabled: false,
  mode: 'single',
} as DatePickerProps;

export const Multiple = (args) => {
  const [dates, setDates] = React.useState<Date[] | undefined>([]);

  return <DatePicker {...args} selected={dates} onSelect={setDates} />;
};

Multiple.args = {
  yearRange: 20,
  disabled: false,
  mode: 'multiple',
};

export const Range = (args) => {
  const [dates, setDates] = React.useState<DateRange | undefined>();

  return <DatePicker {...args} selected={dates} onSelect={setDates} />;
};

Range.args = {
  yearRange: 20,
  disabled: false,
  mode: 'range',
};
