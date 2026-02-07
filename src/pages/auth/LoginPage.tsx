import { AuthForm } from "@/pages/auth/components/AuthForm.tsx";
import { Container } from "@mui/material";

export const LoginPage = () => {
  return (
    <Container >
      <h1>Login Page</h1>
      <AuthForm type="login"/>
    </Container>
  );
}
