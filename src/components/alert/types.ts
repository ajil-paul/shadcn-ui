import { ButtonProps } from '@components/button';

export interface AlertProps {
  /**
   * Controls whether the alert is open or not.
   * - `true`: The alert is visible.
   * - `false`: The alert is hidden.
   */
  isOpen?: boolean;

  /**
   * Controls whether the action button is loading.
   * - `true`: The alert is visible.
   * - `false`: The alert is hidden.
   */
  isLoading?: boolean;

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
export interface ShowAlertProps {
  /** Title of the alert dialog */
  title: string;
  /** Description or message content of the alert dialog */
  description?: string;
  /** Whether the action button should display a loading state */
  loading?: boolean;
  /** Label for the action button */
  actionLabel?: string;
  /** Label for the cancel button */
  cancelLabel?: string;
  /** Function to execute when the action button is clicked */
  onContinue?: () => Promise<void> | void;
  /** Function to execute when the alert dialog is closed */
  onClose?: () => void;
}
