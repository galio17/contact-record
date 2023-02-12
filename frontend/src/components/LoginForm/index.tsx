import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { apiError } from "../../errors";
import { useUserContext } from "../../hooks/providers";
import { useToastLoading } from "../../hooks/toastify";
import { LoginRequestAPI } from "../../providers/user/interface";
import { loginValidator } from "../../validators";
import Form, { Input } from "../FormFields";

const LoginForm = () => {
  const { loading, success, error: errorToast } = useToastLoading();
  const { login } = useUserContext();
  const onSubmit = async (data: LoginRequestAPI) => {
    const toastId = loading("test");
    try {
      const loginData = await login(data);
      success(toastId, "Login Efetuado com sucesso");
    } catch (error) {
      const message = apiError(error, ["ewfiuhwef", "gfwrgr"]);

      if (!message) {
        return console.log("Erro inexperado");
      }

      errorToast(toastId, "test");
    }
  };

  return (
    <Form onValid={onSubmit} validator={loginValidator}>
      <Input name="email" label="Email" />
      <Input name="password" label="senha" />
      <Button type="submit">Entrar</Button>
    </Form>
  );
};

export default LoginForm;
