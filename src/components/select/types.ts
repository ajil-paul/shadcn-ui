import { Props } from 'react-select';

export interface SelectProps extends Props {
  /**
   * Defines the strategy for how the select options are displayed.
   * - `default`: The default behavior for displaying options.
   * - `fixed`: A fixed layout for the select options, potentially with predefined sizes or constraints.
   */
  strategy?: 'default' | 'fixed';

  /**
   * The helper text displayed below the select field.
   * This can be used to provide additional instructions or context to the user.
   */
  helpText?: string;

  /**
   * Error message displayed below the select field when there is a validation issue.
   * This message is shown when the field is invalid, helping users identify what needs to be fixed.
   */
  error?: string;

  /**
   * The label text displayed above the select input.
   * This provides a clear description of what the select input is for.
   */
  label?: string;

  /**
   * A custom class name applied to the wrapper around the select input.
   * This allows you to customize the styling of the wrapper element surrounding the select component.
   */
  wrapperClassName?: string;
}
