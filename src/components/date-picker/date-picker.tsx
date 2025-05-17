'use client';

import * as React from 'react';

import { format } from 'date-fns';
import { CalendarIcon, MoveRight, XIcon } from 'lucide-react';
import { isEmpty, isNotEmpty } from 'ramda';
import { DateRange } from 'react-day-picker';

import { buttonVariants } from '@base/button';
import { Popover, PopoverContent, PopoverTrigger } from '@base/popover';
import { Button } from '@components/button';
import { Calendar } from '@components/calendar';
import { cn } from '@lib/utils';

import {
  DatePickerProps,
  MultipleModeButtonProps,
  RangeModeButtonProps,
  SingleModeButtonProps,
} from './types';

const MULTI_DATE_VISIBLE_COUNT = 2;

export function DatePicker(props: DatePickerProps) {
  const {
    mode,
    disabled,
    className,
    placeholder,
    dateFormat = 'PP',
    selected,
    onSelect,
    ...calendarProps
  } = props;

  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const removeDate = (date: Date, event: React.MouseEvent<SVGSVGElement>) => {
    if (props.mode === 'multiple' && props.selected) {
      const filteredDate = props.selected.filter(
        (currDate) => currDate !== date
      );
      props.onSelect?.(
        filteredDate,
        date,
        {},
        event as unknown as React.MouseEvent<Element, MouseEvent>
      );
      event.stopPropagation();
    }
  };

  const handleSelect: typeof onSelect = (
    currentValue: Date | Date[] | DateRange | undefined,
    selectedDate: Date | undefined,
    activeModifiers: any,
    event:
      | React.MouseEvent<Element, MouseEvent>
      | React.KeyboardEvent<Element>
      | undefined
  ) => {
    if (onSelect) {
      (onSelect as any)(
        currentValue,
        selectedDate,
        activeModifiers,
        event as React.MouseEvent | undefined
      );
    }

    if (
      (mode === 'single' || mode === undefined) &&
      currentValue instanceof Date
    ) {
      setIsPopoverOpen(false);
    }
  };

  const renderTriggerButton = () => {
    switch (mode) {
      case 'range':
        return (
          <RangeModeButton
            {...{
              date: selected as DateRange | undefined,
              dateFormat,
              disabled,
              className,
              placeholder,
            }}
          />
        );
      case 'multiple':
        return (
          <MultipleModeButton
            {...{
              dates: selected as Date[] | undefined,
              dateFormat,
              disabled,
              className,
              placeholder,
              removeDate,
            }}
          />
        );
      default:
        return (
          <SingleModeButton
            {...{
              date: selected as Date | undefined,
              dateFormat,
              disabled,
              className,
              placeholder,
            }}
          />
        );
    }
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        {renderTriggerButton()}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          today={new Date()}
          mode={mode}
          selected={selected as any}
          onSelect={handleSelect as any}
          autoFocus
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  );
}

const SingleModeButton = React.forwardRef<
  HTMLButtonElement,
  SingleModeButtonProps
>(
  (
    {
      placeholder,
      date,
      dateFormat,
      disabled,
      className,
      ...props
    }: SingleModeButtonProps,
    ref
  ) => {
    const label = date ? (
      format(date, dateFormat)
    ) : (
      <span>{placeholder || 'Pick a date'}</span>
    );

    return (
      <Button
        ref={ref}
        {...props}
        variant="outline"
        data-testid="date-picker-trigger"
        disabled={disabled}
        className={cn(
          'gap-x-4 justify-start',
          !date && 'text-muted-foreground',
          className
        )}
        icon={CalendarIcon}
        iconPosition="right"
        label={label}
      />
    );
  }
);

const MultipleModeButton = React.forwardRef<
  HTMLDivElement,
  MultipleModeButtonProps
>(
  (
    {
      placeholder,
      dates,
      dateFormat,
      disabled,
      className,
      removeDate,
      ...props
    }: MultipleModeButtonProps,
    ref
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        role="button"
        data-testid="date-picker-trigger"
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'hover:bg-background min-w-56',
          className,
          isNotEmpty(dates) && 'px-1',
          disabled && 'disabled pointer-events-none'
        )}
      >
        {isEmpty(dates) ? (
          <span>{placeholder || 'Select dates'}</span>
        ) : (
          <>
            {dates?.slice(0, MULTI_DATE_VISIBLE_COUNT).map((date) => (
              <Button
                key={date.toISOString()}
                variant="outline"
                className="py-0.5 px-1"
                label={format(date, dateFormat)}
                size="sm"
                iconPosition="right"
                icon={
                  // Pass event correctly
                  <XIcon
                    data-testid="unselect-date-close-icon"
                    onClick={(event: React.MouseEvent<SVGSVGElement>) =>
                      removeDate(date, event)
                    }
                    size={12}
                  />
                }
              />
            ))}
            {dates && dates.length > MULTI_DATE_VISIBLE_COUNT && (
              <Button
                variant="outline"
                className="py-0.5 px-2"
                label={` + ${dates.length - MULTI_DATE_VISIBLE_COUNT} ...`}
                size="sm"
              />
            )}
          </>
        )}
      </div>
    );
  }
);

const RangeModeButton = React.forwardRef<
  HTMLButtonElement,
  RangeModeButtonProps
>(
  (
    {
      disabled,
      date,
      className,
      dateFormat,
      placeholder,
      ...props
    }: RangeModeButtonProps,
    ref
  ) => {
    const startDate = date?.from
      ? format(date.from, dateFormat)
      : placeholder || 'Start date';
    const endDate = date?.to
      ? format(date.to, dateFormat)
      : placeholder || 'End date';

    return (
      <Button
        ref={ref}
        {...props}
        variant="outline"
        data-testid="date-picker-trigger"
        disabled={disabled}
        className={cn(
          'gap-x-4 justify-start',
          !date && 'text-muted-foreground',
          className
        )}
        icon={CalendarIcon}
        iconPosition="right"
        label={
          <span className="inline-flex items-center gap-x-2">
            <span data-testid="selected-start-date">{startDate}</span>
            <MoveRight size={12} />
            <span data-testid="selected-end-date">{endDate}</span>
          </span>
        }
      />
    );
  }
);
