import "yup-phone";

import * as yup from "yup";
import { emailValidation, phoneValidation } from ".";
import { ILogin } from "../interfaces/sessions";

export const loginSchema: yup.SchemaOf<ILogin> = yup.object().shape({
  email: emailValidation.required(),
  password: yup.string().required(),
});

export const updateProfileSchema = yup.object().shape({
  name: yup.string().notRequired(),
  emails: yup.lazy((val) =>
    Array.isArray(val)
      ? yup.array().of(emailValidation.required()).notRequired().min(1)
      : emailValidation
          .notRequired()
          .typeError("emails must be a string or array of strings")
  ),
  accessEmail: yup
    .mixed()
    .when("emails", (emails) => {
      if (Array.isArray(emails)) {
        return yup
          .string()
          .oneOf(emails, "accessEmail must be one of the emails field item")
          .required("accessEmail is a required field when emails is an array");
      }

      if (!emails) {
        return emailValidation.notRequired();
      }

      return emailValidation
        .equals(
          [undefined],
          "accesEmail must only be passed when emails is an array or undefined"
        )
        .notRequired();
    })
    .notRequired(),
  password: yup.string().notRequired(),
  phones: yup.lazy((val) => {
    if (!val) {
      return yup.string().notRequired();
    }

    return Array.isArray(val)
      ? yup.array().of(phoneValidation.notRequired()).notRequired().min(1)
      : phoneValidation.notRequired();
  }),
});
