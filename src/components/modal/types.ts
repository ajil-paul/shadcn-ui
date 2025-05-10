import { ReactNode } from 'react';

export interface ModalProps {
  /** To specify whether the Modal component is open or not. */
  open?: boolean;

  /** To specify whether the Modal component is open by default or not. */
  defaultOpen?: boolean;

  /** To specify the callback which will be invoked when the user clicks on open or close trigger. */

  onOpenChange?(open: boolean): void;

  modal?: boolean;

  /** The size of the Modal */
  size?: 'sm' | 'md' | 'lg';
  /** Optional trigger element to open the Modal */
  trigger?: ReactNode;
  /** Content to be rendered inside the Modal */
  children?: ReactNode;
}

/**
 * Props for the ModalHeader component
 */
export interface ModalHeaderProps {
  /** Additional CSS classes */
  className?: string;
  /** Title text for the header */
  title?: string;
  /** Description text for the header */
  description?: string;
  /** Content to be rendered inside the header */
  children?: ReactNode;
}

/**
 * Props for the ModalBody component
 */
export interface ModalBodyProps {
  /** Additional CSS classes */
  className?: string;
  /** Content to be rendered inside the body */
  children?: ReactNode;
}

/**
 * Props for the ModalFooter component
 */
export interface ModalFooterProps {
  /** Additional CSS classes */
  className?: string;
  /** Content to be rendered inside the footer */
  children?: ReactNode;
}
