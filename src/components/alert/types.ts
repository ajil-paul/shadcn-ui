import { ButtonProps } from '@components/button';

export interface AlertProps {
  /**
   * Controls whether the alert is open or not.
   * - `true`: The alert is visible.
   * - `false`: The alert is hidden.
   */
  isOpen?: boolean;

  /**
   * The title displayed at the top of the alert.
   * This is typically a short, descriptive text about the alert.
   */
  title: string;

  /**
   * The detailed message or description displayed in the alert.
   * Can be a string or a React node for custom rendering.
   */
  description: string | React.ReactNode;

  /**
   * The label for the primary action button in the alert.
   * For example, "Confirm" or "Submit".
   */
  actionLabel?: string;

  /**
   * The label for the cancel button in the alert.
   * For example, "Cancel" or "Dismiss".
   */
  cancelLabel?: string;

  /**
   * Props to customize the appearance and behavior of the button
   * that triggers the alert.
   * Accepts a `ButtonProps` object for full customization.
   */
  triggerButtonProps?: ButtonProps;

  /**
   * Callback function executed when the alert is closed.
   */
  onClose?: () => void;

  /**
   * Callback function executed when the primary action button is clicked.
   */
  onAction?: () => void;
}
