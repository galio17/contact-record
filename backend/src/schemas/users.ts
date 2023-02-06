import * as yup from "yup";
import { emailValidation, phoneValidation } from ".";

export const createUserSchema = yup.object().shape({
  name: yup.string().required(),
  emails: yup.lazy((val) =>
    Array.isArray(val)
      ? yup.array().of(emailValidation).required().min(1)
      : emailValidation
          .required()
          .typeError("emails must be a string or array of strings")
  ),
  accessEmail: yup
    .mixed()
    .when("emails", (emails, schema) => {
      if (Array.isArray(emails)) {
        return yup
          .string()
          .oneOf(emails, "accessEmail must be one of the emails field item")
          .required("accessEmail is a required field if emails is an array");
      }

      return schema;
    })
    .notRequired(),
  password: yup.string().required(),
  phones: yup.lazy((val) =>
    Array.isArray(val)
      ? yup.array().of(phoneValidation).required().min(1)
      : phoneValidation
  ),
});
