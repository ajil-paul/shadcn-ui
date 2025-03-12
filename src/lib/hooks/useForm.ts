import {
  useForm as useFormHook,
  UseFormProps,
  UseFormReturn,
  FieldValues,
} from 'react-hook-form';
import { object, AnyObjectSchema } from 'yup';

import { useYupResolver } from './useYupResolver';

interface UseFormWithSchemaProps<T extends FieldValues>
  extends UseFormProps<T> {
  schema?: AnyObjectSchema;
}

// Custom useForm hook with extended Yup validation
export const useForm = <
  TFieldValues extends Record<string, any> = Record<string, any>,
>({
  schema = object(),
  ...otherProps
}: UseFormWithSchemaProps<TFieldValues>): UseFormReturn<TFieldValues> => {
  const resolver = useYupResolver(schema);

  return useFormHook<TFieldValues>({
    resolver,
    ...otherProps,
  });
};
