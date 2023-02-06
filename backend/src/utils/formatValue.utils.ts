import { AnySchema } from "yup";

export const formatValue = <Value>(
  value: Value,
  schema: AnySchema,
  ...removeKeys: Value extends object ? (keyof Value)[] : undefined[]
) => {
  const valueFormated = schema.validateSync(value, { stripUnknown: true });

  if (typeof value === "object" && removeKeys.length) {
    Object.keys(valueFormated).forEach(() => {
      valueFormated[removeKeys] = undefined;
    });
  }

  return valueFormated;
};
