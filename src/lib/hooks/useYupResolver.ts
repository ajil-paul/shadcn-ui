import { useCallback } from 'react';

import * as Yup from 'yup';

// Define types for the resolver result
interface ResolverResult<T> {
  values: T;
  errors: Record<string, { message: string }>;
}

// Define the resolver hook
const useYupResolver = <T extends Record<string, any>>(
  validationSchema: Yup.Schema<T> | Yup.Schema<any> // Use `SchemaOf<T>` for stricter typing
): ((data: T) => Promise<ResolverResult<T>>) =>
  useCallback(
    async (data: T): Promise<ResolverResult<T>> => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false, // Collect all errors
        });

        return {
          values,
          errors: {}, // No errors, validation succeeded
        };
      } catch (error) {
        const yupError = error as Yup.ValidationError;
        return {
          values: {} as T, // No values if validation fails
          errors: yupError.inner.reduce(
            (allErrors: Record<string, { message: string }>, currentError) => {
              return {
                ...allErrors,
                [currentError.path ?? 'unknown']: {
                  message: currentError.message,
                },
              };
            },
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

export { useYupResolver };
