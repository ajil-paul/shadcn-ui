import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import {
  DatePicker,
  MultipleDatePickerProps,
  RangeDatePickerProps,
  SingleDatePickerProps,
} from '.';

const findButton = (name: string | RegExp) =>
  screen.findByRole('button', { name });

describe('DatePicker', () => {
  it('renders with default props (single mode)', () => {
    render(
      <DatePicker
        mode="single"
        selected={undefined}
        onSelect={vi.fn() as SingleDatePickerProps['onSelect']}
      />
    );
    expect(screen.getByTestId('date-picker-trigger')).toBeInTheDocument();
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
  });

  it('renders in single mode and allows date selection', async () => {
    const onSelect = vi.fn() as (date?: Date) => void;
    let selectedDate: Date | undefined = undefined;
    const currentMonth = new Date();

    const { rerender } = render(
      <DatePicker
        mode="single"
        selected={selectedDate}
        defaultMonth={currentMonth}
        onSelect={(date) => {
          selectedDate = date as Date;
          onSelect(date as Date);
        }}
      />
    );

    fireEvent.click(screen.getByTestId('date-picker-trigger'));
    expect(
      document.querySelector("[data-testid='calendar-container']")
    ).toBeInTheDocument();

    const calendar = document.querySelector(
      "[data-testid='calendar-container']"
    ) as HTMLElement;
    expect(calendar).toBeInTheDocument();

    const dayToSelect = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      15
    );
    const dateButton = await within(calendar).findByText(
      dayToSelect.getDate().toString()
    );
    fireEvent.click(dateButton);

    expect(onSelect).toHaveBeenCalledWith(expect.any(Date));
    expect(
      document.querySelector("[data-testid='calendar-container']")
    ).not.toBeInTheDocument(); // Popover closes

    rerender(
      <DatePicker
        mode="single"
        selected={selectedDate}
        defaultMonth={currentMonth}
        onSelect={(date) => {
          selectedDate = date as Date;
          onSelect(date as Date);
        }}
      />
    );
    expect(screen.getByText(format(selectedDate!, 'PP'))).toBeInTheDocument();
  });

  it('renders in multiple mode and allows multiple date selections and removal', async () => {
    const onSelect = vi.fn() as (dates?: Date[]) => void;
    let selectedDates: Date[] = [];
    const currentMonth = new Date();

    const { rerender } = render(
      <DatePicker
        mode="multiple"
        selected={selectedDates}
        defaultMonth={currentMonth}
        onSelect={(dates) => {
          selectedDates = dates as Date[];
          onSelect(dates as Date[]);
        }}
      />
    );

    fireEvent.click(screen.getByTestId('date-picker-trigger'));
    expect(
      document.querySelector("[data-testid='calendar-container']")
    ).toBeInTheDocument();

    const calendar = document.querySelector(
      "[data-testid='calendar-container']"
    ) as HTMLElement;

    // Select first date
    const date1 = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      10
    );
    const dateButton1 = await within(calendar).findByText(
      date1.getDate().toString()
    );
    fireEvent.click(dateButton1);
    expect(onSelect).toHaveBeenCalledWith([expect.any(Date)]);

    rerender(
      <DatePicker
        mode="multiple"
        selected={selectedDates}
        defaultMonth={currentMonth}
        onSelect={(dates) => {
          selectedDates = dates as Date[];
          onSelect(dates as Date[]);
        }}
      />
    );
    expect(screen.getByText(format(date1, 'PP'))).toBeInTheDocument();

    const calendarAgain = document.querySelector(
      "[data-testid='calendar-container']"
    ) as HTMLElement;
    const date2 = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      12
    );
    const dateButton2 = await within(calendarAgain).findByText(
      date2.getDate().toString()
    );
    fireEvent.click(dateButton2);
    expect(onSelect).toHaveBeenCalledWith([expect.any(Date), expect.any(Date)]);

    rerender(
      <DatePicker
        mode="multiple"
        selected={selectedDates}
        defaultMonth={currentMonth}
        onSelect={(dates) => {
          selectedDates = dates as Date[];
          onSelect(dates as Date[]);
        }}
      />
    );
    expect(screen.getByText(format(date1, 'PP'))).toBeInTheDocument();
    expect(screen.getByText(format(date2, 'PP'))).toBeInTheDocument();

    expect(
      document.querySelector("[data-testid='calendar-container']")
    ).toBeInTheDocument(); // Popover stays open

    // Remove the first date
    const dateButton = screen.getByText(format(date1, 'PP')).closest('button');
    expect(dateButton).toBeInTheDocument();
    const xIcon = within(dateButton!).getByTestId('unselect-date-close-icon');
    fireEvent.click(xIcon);
    expect(onSelect).toHaveBeenCalledWith([expect.any(Date)]); // Only date2 left

    rerender(
      <DatePicker
        mode="multiple"
        selected={selectedDates}
        defaultMonth={currentMonth}
        onSelect={(dates) => {
          selectedDates = dates as Date[];
          onSelect(dates as Date[]);
        }}
      />
    );
    expect(screen.queryByText(format(date1, 'PP'))).not.toBeInTheDocument();
    expect(screen.getByText(format(date2, 'PP'))).toBeInTheDocument();
  });

  it('renders in range mode and allows date range selection and displays it', async () => {
    const onSelect = vi.fn() as (range?: DateRange) => void;
    let selectedRange: DateRange | undefined = undefined;
    const currentMonth = new Date();

    const { rerender } = render(
      <DatePicker
        mode="range"
        selected={selectedRange}
        defaultMonth={currentMonth} // Ensure consistent month view
        onSelect={(range) => {
          selectedRange = range as DateRange;
          onSelect(range as DateRange);
        }}
      />
    );

    fireEvent.click(screen.getByTestId('date-picker-trigger'));
    expect(
      document.querySelector("[data-testid = 'calendar-container']")
    ).toBeInTheDocument();

    const calendar = document.querySelector(
      "[data-testid = 'calendar-container']"
    ) as HTMLElement;
    expect(calendar).toBeInTheDocument();

    // Select start date
    const startDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      5
    );
    const startDateButton = await within(calendar).findByText(
      startDate.getDate().toString()
    );
    fireEvent.click(startDateButton);
    expect(onSelect).toHaveBeenCalledWith({
      from: expect.any(Date),
      to: expect.any(Date),
    });

    rerender(
      <DatePicker
        mode="range"
        selected={selectedRange}
        defaultMonth={currentMonth}
        onSelect={(range) => {
          selectedRange = range as DateRange;
          onSelect(range as DateRange);
        }}
      />
    );
    expect(screen.getByTestId('selected-start-date')).toBeInTheDocument();
    expect(screen.getByTestId('selected-start-date').textContent).toEqual(
      format(startDate, 'PP')
    );

    // Select end date
    const endDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      25
    );

    const endDateButton = await within(calendar).findByText(
      endDate.getDate().toString()
    );

    fireEvent.click(endDateButton);
    expect(onSelect).toHaveBeenCalledWith({
      from: expect.any(Date),
      to: expect.any(Date),
    });

    rerender(
      <DatePicker
        mode="range"
        selected={selectedRange}
        defaultMonth={currentMonth}
        onSelect={(range) => {
          selectedRange = range as DateRange;
          onSelect(range as DateRange);
        }}
      />
    );
    expect(screen.getByTestId('selected-end-date')).toBeInTheDocument();
    expect(screen.getByTestId('selected-end-date').textContent).toEqual(
      format(endDate, 'PP')
    );
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <DatePicker
        mode="single"
        selected={undefined}
        onSelect={vi.fn() as SingleDatePickerProps['onSelect']}
        disabled
      />
    );
    const triggerButton = screen.getByRole('button');
    expect(triggerButton).toBeDisabled();
  });

  it('displays date in custom format', async () => {
    const customFormat = 'yyyy-MM-dd';
    const selectedDate = new Date();
    render(
      <DatePicker
        mode="single"
        selected={selectedDate}
        onSelect={vi.fn() as (date?: Date) => void}
        dateFormat={customFormat}
      />
    );
    expect(
      await findButton(format(selectedDate, customFormat))
    ).toBeInTheDocument();
  });

  it('displays custom placeholder for single mode', () => {
    const placeholder = 'Test Single Placeholder';
    render(
      <DatePicker
        mode="single"
        selected={undefined}
        onSelect={vi.fn() as SingleDatePickerProps['onSelect']}
        placeholder={placeholder}
      />
    );
    expect(
      screen.getByRole('button', { name: placeholder })
    ).toBeInTheDocument();
  });

  it('displays custom placeholder for multiple mode', () => {
    const placeholder = 'Test Multiple Placeholder';
    render(
      <DatePicker
        mode="multiple"
        selected={[]}
        onSelect={vi.fn() as MultipleDatePickerProps['onSelect']}
        placeholder={placeholder}
      />
    );
    const buttonContainer = screen.getByText(placeholder).closest('div');
    expect(buttonContainer).toBeInTheDocument();
  });

  it('displays custom placeholder for range mode', () => {
    const placeholder = 'Test Range Placeholder';
    render(
      <DatePicker
        mode="range"
        selected={undefined}
        onSelect={vi.fn() as RangeDatePickerProps['onSelect']}
        placeholder={placeholder}
      />
    );
    // In range mode, placeholder applies to start/end date if not individually specified
    // The button text will contain the placeholder twice
    const triggerButton = screen.getByTestId('date-picker-trigger');
    expect(within(triggerButton).getAllByText(placeholder).length).toBe(2);
  });
});
