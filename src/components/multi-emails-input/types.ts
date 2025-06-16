import { GroupBase, OptionsOrGroups } from 'react-select';

export interface EmailOption {
  value: string;
  label?: string;
  valid?: boolean;
  id?: string | number;
}

export interface CounterProps {
  label?: string;
  startsFrom?: number;
}

export interface FilterInvalidEmailsProps {
  label?: string;
}

export interface MultiEmailInputProps {
  label?: string;
  placeholder?: string;
  helpText?: string;
  value?: EmailOption[];
  onChange?: (emails: EmailOption[]) => void;
  error?: string;
  onBlur?: (event: React.FocusEvent) => void;
  filterInvalidEmails?: FilterInvalidEmailsProps;
  counter?: boolean | CounterProps;
  disabled?: boolean;
  maxHeight?: number;
  required?: boolean;
  labelProps?: Record<string, any>;
  visibleEmailsCount?: number;
  isCreateable?: boolean;
  isAlwaysExpanded?: boolean;
  options?: OptionsOrGroups<EmailOption, GroupBase<EmailOption>>;
  onCreateOption?: (input: string) => void;
  className?: string;
  wrapperClassName?: string;
  id?: string;
}
