import { object, string } from "yup";

export const loginValidator = object().shape({
  email: string().email().required(),
  password: string().required(),
});
