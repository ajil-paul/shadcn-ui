export interface DropdownItemProps {
  /**
   * The unique key for the dropdown item.
   * This is used to identify the item in a list and optimize rendering.
   */
  key?: string | number;

  /**
   * The type of dropdown item.
   * - `label`: A non-interactive label used for grouping items.
   * - `separator`: A visual separator between groups of items.
   * - `checkbox`: A checkbox item, which can be checked or unchecked.
   * - `item`: A regular interactive item.
   * - A custom string type to support any other item type.
   */
  type?: 'label' | 'separator' | 'checkbox' | 'item' | string | undefined;

  /**
   * The title or text displayed for the dropdown item.
   * This is typically a string or a React node that represents the content of the item.
   */
  title?: string;

  /**
   * The keyboard shortcut associated with the dropdown item.
   * This can be displayed next to the title or used for accessibility.
   */
  shortcut?: string;

  /**
   * An array of child `DropdownItemProps` objects.
   * This is used for nesting items within a dropdown (e.g., a dropdown within a dropdown).
   */
  children?: Array<DropdownItemProps>;

  /**
   * The checked state for checkbox items.
   * This is used to determine if a checkbox item is selected or not.
   */
  checked?: boolean;

  /**
   * If `true`, this item will be styled as a dangerous action (e.g., for delete operations).
   * It typically applies a red color or other attention-grabbing styles.
   */
  danger?: boolean;

  /**
   * If `true`, the item will be disabled and unclickable.
   * This is useful for graying out items or preventing user interaction.
   */
  disabled?: boolean;

  /**
   * A custom class name to apply to the item element.
   * This allows you to add custom styling to the item, overriding the default styles.
   */
  className?: string;

  /**
   * Inline CSS styles to apply to the dropdown item.
   * This provides an easy way to apply styles directly to an individual item.
   */
  style?: React.CSSProperties;

  /**
   * An optional icon to display next to the dropdown item.
   * This can be used to provide visual context or enhance the item's appearance.
   */
  icon?: React.ElementType | React.ReactNode;

  /**
   * A callback function that is triggered when the checked state of a checkbox item changes.
   * This is typically used to update the state of the parent component.
   */
  onCheckedChange?: (checked: boolean) => void;

  /**
   * A callback function that is triggered when the dropdown item is clicked.
   * This is typically used to perform an action when the item is selected.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * A custom render function that returns a React node.
   * This allows you to render custom content for the dropdown
   * item, overriding the default rendering behavior.
   */
  render?: () => React.ReactNode;
}

export interface DropdownProps {
  /**
   * The content or trigger element that opens the dropdown when clicked.
   * Can be a string, JSX, or any other React node.
   */
  children: React.ReactNode;

  /**
   * A list of items to be displayed in the dropdown menu.
   * Each item should adhere to the `DropdownItemProps` interface.
   * This array can include various item types like labels, checkboxes, or action buttons.
   */
  menuList: Array<DropdownItemProps>;

  /**
   * The side of the trigger element where the dropdown should appear.
   * This can be one of the following values: "left", "right", "top", "bottom".
   */
  side?: 'left' | 'right' | 'top' | 'bottom';

  /**
   * An optional class name to apply to the dropdown menu content.
   * This can be used to style the dropdown menu or override default styles.
   */
  menuClassName?: string;

  /**
   * The offset distance from the trigger element where the dropdown should appear.
   * This value can be positive or negative to adjust the position of the dropdown.
   */
  sideOffset?: number;

  /**
   * The alignment of the dropdown content relative to the trigger element.
   * This can be one of the following values: "start" or "end".
   */
  align?: 'start' | 'end';
}
