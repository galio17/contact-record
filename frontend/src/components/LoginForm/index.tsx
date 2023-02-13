import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { apiError } from "../../errors";
import { useUserContext } from "../../hooks/providers";
import { useToastLoading } from "../../hooks/toastify";
import { LoginRequestAPI } from "../../providers/user/interface";
import { loginValidator } from "../../validators";
import Form, { Input } from "../FormFields";

const LoginForm = () => {
  const navigate = useNavigate();
  const { loading, success, error: errorToast } = useToastLoading();
  const { login } = useUserContext();
  const onSubmit = async (data: LoginRequestAPI) => {
    const toastId = loading("Carregando");
    try {
      await login(data);
      success(toastId, "Login Efetuado com sucesso");
      navigate("/");
    } catch (error) {
      const message = apiError(error, [
        /^(?=.*email)(?=.*password)(?=.*match).*$/,
        "Email ou senha não correspondem",
      ]);

      if (!message) {
        return errorToast(toastId, "Erro inexperado");
      }

      errorToast(toastId, message);
    }
  };

  return (
    <Form onValid={onSubmit} validator={loginValidator}>
      <Stack spacing={1}>
        <Input
          name="email"
          label="Email"
          variant="standard"
          InputLabelProps={{ required: true }}
        />
        <Input
          name="password"
          label="senha"
          variant="standard"
          InputLabelProps={{ required: true }}
        />
        <Button type="submit" variant="contained">
          Entrar
        </Button>
      </Stack>
    </Form>
  );
};

export default LoginForm;
