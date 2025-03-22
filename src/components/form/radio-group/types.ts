import { Control } from 'react-hook-form';

import { RadioGroupProps } from '../../radio-group/types';

export interface FormRadioGroupProps extends RadioGroupProps {
  /**
   * The `control` prop is passed from `react-hook-form` to manage form state.
   * It should be provided by the parent form component and is used to control the form validation and submission.
   */
  control: Control<any>;

  /**
   * The `name` prop is used to uniquely identify the checkbox in the form.
   * It should match the name attribute in the form and will be used for form validation and submission.
   */
  name: string;
}
