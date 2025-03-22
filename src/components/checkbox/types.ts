import { Root } from '@radix-ui/react-checkbox';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof Root> {
  /**
   * The label text displayed next to the checkbox.
   * Provides a description or context for the checkbox, helping users understand its purpose.
   */
  label?: string;

  /**
   * An error message displayed below the checkbox when there is a validation issue.
   * This message is typically shown when the checkbox is in an invalid state.
   */
  error?: string;

  /**
   * Helper text displayed below the checkbox to provide additional context or instructions.
   * This can help clarify the checkbox's purpose or give further details to the user.
   */
  helpText?: string;
  /**
   * Classname for the wrapper component.
   */
  wrapperClassName?: string;
}
