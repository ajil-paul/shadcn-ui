export type HtmlTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export type TypographyTypes =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'body3';

export interface TypographyProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * The type of typography style to apply.
   * - `h1`: Primary header style.
   * - `h2`: Secondary header style.
   * - `h3`: Tertiary header style.
   * - `h4`: Fourth-level header style.
   * - `h5`: Fifth-level header style.
   * - `h6`: Sixth-level header style.
   * - `body1`: First body text style.
   * - `body2`: Second body text style.
   * - `body3`: Third body text style.
   */
  type?: TypographyTypes;

  /**
   * Specifies the HTML tag to render as, allowing for flexibility in rendering different elements.
   * The default is typically an `h1` to `h6` or body text element.
   */
  as?: HtmlTags;
}
