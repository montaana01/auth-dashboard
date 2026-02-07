import { AuthForm } from "@/pages/auth/components/AuthForm.tsx";
import { Container } from "@mui/material";

export const RegisterPage = () => {
  return (
    <Container >
      <h1>Register Page</h1>
      <AuthForm type="register" />
    </Container>
  )
}
