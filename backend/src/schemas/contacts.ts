import "yup-phone";

import * as yup from "yup";
import { emailValidation, phoneValidation } from ".";

export const createContactSchema = yup.object().shape({
  name: yup.string().required(),
  emails: yup.lazy((val) =>
    Array.isArray(val)
      ? yup.array().of(emailValidation.required()).required().min(1)
      : emailValidation
          .required()
          .typeError("emails must be a string or array of strings")
  ),
  phones: yup.lazy((val) =>
    Array.isArray(val)
      ? yup.array().of(phoneValidation.required()).required().min(1)
      : phoneValidation
          .required()
          .typeError("phones must be a string or array of strings")
  ),
});

export const updateContactSchema = yup.object().shape({
  name: yup.string().notRequired(),
  emails: yup.lazy((val) =>
    Array.isArray(val)
      ? yup.array().of(emailValidation.required()).notRequired().min(1)
      : emailValidation
          .notRequired()
          .typeError("emails must be a string or array of strings")
  ),
  phones: yup.lazy((val) => {
    if (!val) {
      return yup.string().notRequired();
    }

    return Array.isArray(val)
      ? yup.array().of(phoneValidation.required()).notRequired().min(1)
      : phoneValidation
          .notRequired()
          .typeError("phones must be a string or array of strings");
  }),
});
