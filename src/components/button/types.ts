import { ButtonProps as BaseButtonProps } from '@base/button';

export interface ButtonProps extends BaseButtonProps {
  isLoading?: boolean;
  loadingText?: string;
}
