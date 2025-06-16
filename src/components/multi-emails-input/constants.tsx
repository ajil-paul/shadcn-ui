import React, { useEffect, useRef } from 'react';

import { XIcon } from 'lucide-react';
import { assoc } from 'ramda';
import {
  components,
  ControlProps,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
  ValueContainerProps,
  ClearIndicatorProps,
  ContainerProps,
  InputProps,
  GroupBase,
  CSSObjectWithLabel,
  MultiValueProps,
  Props,
} from 'react-select';

import { Tag } from '@components/tag';
import { hyphenize } from '@lib/utils';

import { EmailOption } from './types';

// Custom props interface
interface CustomSelectProps {
  isFocused?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  visibleEmailsCount?: number;
  isAlwaysExpanded?: boolean;
  handleEmailChange?: (value: string) => void;
}

// Extend the base Props type with our custom props
type ExtendedProps = Props<EmailOption, true, GroupBase<EmailOption>> &
  CustomSelectProps;

// Extend HTMLAttributes to include data-cy
interface ExtendedHTMLAttributes extends React.HTMLAttributes<HTMLDivElement> {
  'data-cy'?: string;
}

const STYLES = {
  border: {
    default: '1px solid hsl(var(--border))',
    error: '1px solid hsl(var(--destructive)) !important',
  },
  color: {
    default: 'hsl(var(--foreground)) !important',
    error: 'hsl(var(--destructive)) !important',
  },
};

const CustomControl = ({
  children,
  ...props
}: ControlProps<EmailOption, true, GroupBase<EmailOption>>) => {
  const { getValue } = props;
  const { isFocused, prefix } = props.selectProps as ExtendedProps;

  const prevValue = useRef<readonly EmailOption[]>([]);
  const controlRef = useRef<HTMLDivElement>(null);

  const value = getValue();

  const scrollToBottom = () => {
    const scrollContainer = controlRef.current;
    if (!scrollContainer) return;

    const { scrollHeight, clientHeight } = scrollContainer;
    scrollContainer.scrollTo({ top: scrollHeight - clientHeight });
  };

  useEffect(() => {
    const isItemAdded = value.length > prevValue.current.length;
    const isItemDeleted = value.length < prevValue.current.length;

    if ((isFocused && !isItemDeleted) || isItemAdded) scrollToBottom();

    prevValue.current = value;
  }, [isFocused, value]);

  return (
    <components.Control
      {...props}
      innerProps={{ ...props.innerProps, ref: controlRef }}
    >
      {prefix && <div className="neeto-ui-email-input__prefix">{prefix}</div>}
      {children}
    </components.Control>
  );
};

const CustomDropdownIndicator = (
  props: DropdownIndicatorProps<EmailOption, true, GroupBase<EmailOption>>
) => {
  const { suffix } = props.selectProps as ExtendedProps;

  return suffix ? (
    <components.DropdownIndicator {...props}>
      <div className="neeto-ui-email-input__suffix">{suffix}</div>
    </components.DropdownIndicator>
  ) : null;
};

const MultiValueRemove = (
  props: MultiValueRemoveProps<EmailOption, true, GroupBase<EmailOption>>
) => (
  <components.MultiValueRemove
    {...props}
    innerProps={
      {
        ...props.innerProps,
        'data-cy': `${hyphenize(props.data.label || '')}-remove-icon`,
      } as ExtendedHTMLAttributes
    }
  >
    <XIcon size={16} />
  </components.MultiValueRemove>
);

const CustomValueContainer = ({
  children,
  ...props
}: ValueContainerProps<EmailOption, true, GroupBase<EmailOption>>) => {
  const { getValue, selectProps } = props;
  const { isFocused, visibleEmailsCount, isAlwaysExpanded } =
    selectProps as ExtendedProps;
  const value = getValue();
  const childrenArray = React.Children.toArray(children);
  const [firstChild, ...rest] = childrenArray;

  const shouldCollapse =
    !isAlwaysExpanded && !isFocused && value.length > (visibleEmailsCount || 0);

  const visibleChildren = shouldCollapse
    ? React.Children.toArray(firstChild).slice(0, visibleEmailsCount)
    : firstChild;

  return (
    <components.ValueContainer
      {...props}
      innerProps={
        {
          ...props.innerProps,
          'data-cy': 'multi-email-input-container',
        } as ExtendedHTMLAttributes
      }
    >
      {visibleChildren}
      {shouldCollapse && (
        <Tag variant="secondary">
          {`${value.length - (visibleEmailsCount || 0)} more`}{' '}
        </Tag>
      )}
      {rest}
    </components.ValueContainer>
  );
};

const CustomClearIndicator = (
  props: ClearIndicatorProps<EmailOption, true, GroupBase<EmailOption>>
) => (
  <components.ClearIndicator
    {...props}
    innerProps={
      {
        ...props.innerProps,
        'data-cy': 'clear-all-button',
      } as ExtendedHTMLAttributes
    }
  >
    <XIcon className="cursor-pointer" size={16} />
  </components.ClearIndicator>
);

const SelectContainer = (
  props: ContainerProps<EmailOption, true, GroupBase<EmailOption>>
) => (
  <components.SelectContainer
    {...props}
    innerProps={
      {
        ...props.innerProps,
        'data-cy': 'multi-email-select-container',
      } as ExtendedHTMLAttributes
    }
  />
);

const Input = (
  props: InputProps<EmailOption, true, GroupBase<EmailOption>>
) => {
  const handlePaste = (event: React.ClipboardEvent) => {
    const { handleEmailChange } = props.selectProps as ExtendedProps;

    const text = event.clipboardData.getData('Text');
    if (!EMAIL_REGEX.test(text)) return;

    event?.preventDefault();
    setTimeout(() => handleEmailChange?.(text));
  };

  return (
    <components.Input
      {...props}
      data-cy="email-select-input-field"
      onPaste={handlePaste}
    />
  );
};

export const EMAIL_REGEX = new RegExp(
  '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$',
  'i'
);

export const UN_STRICT_EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g;

export const EMAIL_SEPARATION_REGEX = /[^\s,]+/g;

export const CUSTOM_STYLES = {
  input: assoc('overflow', 'hidden'),
  multiValue: (
    styles: CSSObjectWithLabel,
    props: MultiValueProps<EmailOption, true, GroupBase<EmailOption>>
  ) => ({
    ...styles,
    border: props.data.valid ? STYLES.border.default : STYLES.border.error,
    color: props.data.valid ? STYLES.color.default : STYLES.color.error,
  }),
};

export const CUSTOM_COMPONENTS = {
  DropdownIndicator: CustomDropdownIndicator,
  Control: CustomControl,
  MultiValueRemove,
  ValueContainer: CustomValueContainer,
  ClearIndicator: CustomClearIndicator,
  SelectContainer,
  Input,
};
