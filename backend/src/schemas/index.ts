import * as yup from "yup";

export const emailValidation = yup.string().email().required();
