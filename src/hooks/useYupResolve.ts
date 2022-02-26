import { useCallback } from "react";
import { ValidationError } from "yup";

const useYupResolver = <T>(
  onValidate: (data: T, content?: any, options?: any) => any
) => {
  return useCallback(
    async (data: any, content: any, options: any) => {
      try {
        const values = await onValidate(data, content, options);

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        if (errors instanceof ValidationError)
          return {
            values: {},
            errors: errors.inner.reduce(
              (allErrors, currentError) => ({
                ...allErrors,
                [currentError.path!]: {
                  type: currentError.type ?? "validation",
                  message: currentError.message,
                },
              }),
              {}
            ),
          };

        throw new Error("Error trying to validate form schema");
      }
    },
    [onValidate]
  );
};

export default useYupResolver;
