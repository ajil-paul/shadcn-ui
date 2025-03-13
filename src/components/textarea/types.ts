export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /**
   * The label text displayed above the textarea.
   * Provides context or description for the textarea field.
   */
  label?: string;

  /**
   * The size of the textarea.
   * - `sm`: Small size.
   * - `md`: Medium size (default).
   * - `lg`: Large size.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Defines the resize behavior of the textarea.
   * - `vertical`: Allows resizing vertically.
   * - `none`: Disables resizing.
   */
  resize?: 'vertical' | 'none';

  /**
   * If `true`, the textarea will have a minimal or "naked" style without borders or background.
   * Useful for embedded or inline text areas.
   */
  isNaked?: boolean;

  /**
   * The maximum number of characters allowed in the textarea.
   * This is used to limit the text input by the user.
   */
  maxLength?: number;

  /**
   * An error message displayed below the textarea when the input is invalid.
   * Typically used for form validation feedback.
   */
  error?: string;

  /**
   * A regular expression to reject certain characters from being entered in the textarea.
   * Can be used to enforce character restrictions.
   */
  rejectCharsRegex?: RegExp;

  /**
   * Helper text displayed below the textarea to provide additional context or instructions.
   */
  helpText?: string;

  /**
   * A custom class name to apply to the label element.
   * Can be used to override default label styles or add custom styling.
   */
  labelClassName?: string;

  /**
   * If `true`, the textarea allows unlimited characters.
   * This will override the `maxLength` prop and remove any character restrictions.
   */
  unlimitedChars?: boolean;
}
