import * as yup from "yup";
import { emailValidation } from ".";
import { ILogin } from "../interfaces/sessions";

export const loginSchema: yup.SchemaOf<ILogin> = yup.object().shape({
  email: emailValidation,
  password: yup.string().required(),
});
