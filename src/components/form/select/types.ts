import { Control } from 'react-hook-form';

import { SelectProps } from '../../select/types';

export interface FormSelectProps
  extends Omit<SelectProps, 'value' | 'onChange' | 'onBlur'> {
  /**
   * The `control` prop is passed from `react-hook-form` to manage form state.
   * It should be provided by the parent form component and is used to control the form validation and submission.
   */
  control: Control<any>;

  /**
   * The `name` prop is used to uniquely identify the select in the form.
   * It should match the name attribute in the form and will be used for form validation and submission.
   */
  name: string;

  /**
   * Array of options for the select component
   */
  options?: any[];

  /**
   * Function to get the value from an option object
   */
  getOptionValue?: (option: any) => any;

  /**
   * Whether the select supports multiple selections
   */
  isMulti?: boolean;
}
