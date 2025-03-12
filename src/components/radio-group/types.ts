import { Root, Item } from '@radix-ui/react-radio-group';

export interface RadioGroupProps extends React.ComponentProps<typeof Root> {
  /**
   * The label for the radio group, providing context or a description for the set of radio buttons.
   * This is usually placed above the group of radio buttons.
   */
  label?: string;

  /**
   * A unique identifier for the radio group.
   * This is useful for associating the label with the group for accessibility purposes.
   */
  id?: string;

  /**
   * Helper text displayed below the radio group to provide additional context or instructions.
   * This can be used for instructions or clarifications on how to use the radio buttons.
   */
  helpText?: string;

  /**
   * An error message to be displayed when the radio group value is invalid.
   * Typically used for form validation feedback.
   */
  error?: string;

  /**
   * A custom class name to apply to the root element of the radio group.
   * This can be used to override default styles or add custom styling.
   */
  className?: string;

  /**
   * A custom class name to apply to the wrapper element around the radio group.
   * Can be used to style the wrapper specifically, separate from the radio group itself.
   */
  wrapperClassName?: string;
}

export interface RadioGroupItemProps extends React.ComponentProps<typeof Item> {
  label?: string;
  labelAlign?: 'start' | 'end';
}
