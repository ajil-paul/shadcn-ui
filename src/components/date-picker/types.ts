import {
  DateRange,
  PropsMulti,
  DayPickerProps,
  PropsRange,
  PropsSingle,
} from 'react-day-picker';

export interface BaseDatePickerProps
  extends Omit<DayPickerProps, 'selected' | 'onSelect' | 'mode'> {
  placeholder?: string;
  dateFormat?: string;
  disabled?: boolean;
  className?: string;
}

export type SingleDatePickerProps = BaseDatePickerProps &
  PropsSingle & {
    mode: 'single';
    selected?: Date;
    onSelect?: (
      date?: Date,
      prevDate?: Date,
      activeModifiers?: any,
      e?: React.MouseEvent
    ) => void;
  };

export type MultipleDatePickerProps = BaseDatePickerProps &
  PropsMulti & {
    mode: 'multiple';
    selected?: Date[];
    onSelect?: (
      dates?: Date[],
      date?: Date,
      activeModifiers?: any,
      e?: React.MouseEvent
    ) => void;
  };

export type RangeDatePickerProps = BaseDatePickerProps &
  PropsRange & {
    mode: 'range';
    selected?: DateRange;
    onSelect?: (
      dates?: DateRange,
      date?: Date,
      activeModifiers?: any,
      e?: React.MouseEvent
    ) => void;
  };

export type DatePickerProps =
  | SingleDatePickerProps
  | MultipleDatePickerProps
  | RangeDatePickerProps;

export interface SingleModeButtonProps {
  placeholder?: string;
  date?: Date;
  dateFormat: string;
  disabled?: boolean;
  className?: string;
}

export interface MultipleModeButtonProps {
  placeholder?: string;
  dates?: Date[];
  dateFormat: string;
  disabled?: boolean;
  className?: string;
  removeDate: (date: Date, event: React.MouseEvent<SVGSVGElement>) => void;
}

export interface RangeModeButtonProps {
  placeholder?: string;
  date?: DateRange;
  dateFormat: string;
  disabled?: boolean;
  className?: string;
}
