import { ReactNode } from 'react';

export interface PaneProps {
  /** To specify whether the Pane component is open or not. */
  open?: boolean;

  /** To specify whether the Pane component is open by default or not. */
  defaultOpen?: boolean;

  /** To specify the callback which will be invoked when the user clicks on open or close trigger. */

  onOpenChange?(open: boolean): void;

  modal?: boolean;

  /** The size of the pane */
  size?: 'sm' | 'md' | 'lg';
  /** Optional trigger element to open the pane */
  trigger?: ReactNode;
  /** Content to be rendered inside the pane */
  children?: ReactNode;
}

/**
 * Props for the PaneHeader component
 */
export interface PaneHeaderProps {
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
 * Props for the PaneBody component
 */
export interface PaneBodyProps {
  /** Additional CSS classes */
  className?: string;
  /** Content to be rendered inside the body */
  children?: ReactNode;
}

/**
 * Props for the PaneFooter component
 */
export interface PaneFooterProps {
  /** Additional CSS classes */
  className?: string;
  /** Content to be rendered inside the footer */
  children?: ReactNode;
}
