import type { ReactNode, ElementType } from 'react';

import { ButtonProps as BaseButtonProps } from '@base/button';

export interface ButtonProps extends BaseButtonProps {
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;

  /**
   * Whether the button is loading.
   */
  loading?: boolean;

  /**
   * The label displayed on the button. Can be a string or a React node.
   */
  label?: string | ReactNode;

  /**
   * The `to` prop for navigation (used when working with routing libraries like React Router).
   */
  to?: string;

  /**
   * The `href` prop for link buttons.
   */
  href?: string;

  /**
   * The visual style of the button. Options include:
   * - `default`: Standard button style.
   * - `destructive`: Indicates a destructive action.
   * - `outline`: Button with an outline style.
   * - `secondary`: A secondary style button.
   * - `ghost`: Minimal style button.
   * - `link`: Button styled as a link.
   */
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';

  /**
   * The size of the button. Options include:
   * - `default`: Standard size.
   * - `sm`: Small size.
   * - `lg`: Large size.
   * - `icon`: Icon-only button.
   */
  size?: 'default' | 'sm' | 'lg' | 'icon';

  /**
   * An optional icon to display inside the button.
   * Can be a React node or a React component for an SVG.
   */
  icon?: ElementType | ReactNode;

  /**
   * The position of the icon relative to the label.
   */
  iconPosition?: 'left' | 'right';
}
