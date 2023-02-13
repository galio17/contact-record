import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import Link from "../../components/Link";
import LoginForm from "../../components/LoginForm";

const LoginPage = () => (
  <Paper
    sx={{
      backgroundImage: "url(/login-background.jpg)",
    }}
  >
    <Stack minHeight={"100vh"} justifyContent={"center"}>
      <Container maxWidth={"xs"}>
        <Box bgcolor={"#ffffff9d"} padding={4} borderRadius={2}>
          <main>
            <Stack alignItems={"stretch"} gap={1}>
              <Typography typography="h4" variant="h2">
                Entrar
              </Typography>
              <LoginForm />
              <Link
                to={"/signUp"}
                variant="button"
                underline="none"
                width={"100%"}
                display={"flex"}
                justifyContent={"center"}
                padding={0.5}
                border={1}
                borderColor={"primary.main"}
                borderRadius={2}
              >
                Cadastrar
              </Link>
            </Stack>
          </main>
        </Box>
      </Container>
    </Stack>
  </Paper>
);

export default LoginPage;
