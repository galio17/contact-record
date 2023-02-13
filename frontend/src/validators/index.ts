import { object, string } from "yup";

export const loginValidator = object().shape({
  email: string()
    .email("Deve ter um formato de email")
    .required("Campo Obrigatório"),
  password: string().required("Campo Obrigatório"),
});
