export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'prefix' | 'suffix'
  > {
  /**
   * The label text displayed next to the input field.
   * Provides context or a description for the input.
   */
  label?: string;

  /**
   * The size of the input field.
   * - `md`: Medium size (default).
   * - `sm`: Small size.
   * - `lg`: Large size.
   */
  size?: 'md' | 'sm' | 'lg';

  /**
   * If `true`, the input field will have a minimal or "naked" style without borders or background.
   * Useful for embedded or inline inputs.
   */
  isNaked?: boolean;

  /**
   * The suffix element displayed at the end of the input field.
   * Can be a string (like a unit or icon) or a custom React node.
   */
  suffix?: string | React.ReactNode;

  /**
   * The prefix element displayed before the input value.
   * Can be a string (like a currency symbol or icon) or a custom React node.
   */
  prefix?: string | React.ReactNode;

  /**
   * Error message to be displayed if the input value is invalid.
   * Typically used when validation fails.
   */
  error?: string;

  /**
   * A regular expression to reject certain characters from being entered in the input.
   * Provides a way to enforce character restrictions.
   */
  rejectCharsRegex?: RegExp;

  /**
   * Helper text displayed below the input field to provide additional context or instructions.
   */
  helpText?: string;

  /**
   * A custom class name to apply to the label element.
   * Can be used to override default styles or add custom styling.
   */
  labelClassName?: string;
}
