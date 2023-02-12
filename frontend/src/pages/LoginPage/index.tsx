import { Typography } from "@mui/material";
import LoginForm from "../../components/LoginForm";

const LoginPage = () => (
  <div>
    <main>
      <Typography typography="h4" variant="h2">
        Faça seu login aqui
      </Typography>
      <LoginForm />
    </main>
  </div>
);

export default LoginPage;
