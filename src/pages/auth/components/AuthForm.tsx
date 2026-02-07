import type { AuthFormProps } from "@/app/types/AuthFormTypes.ts";
import type { RootState } from "@/app/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { login } from "@/shared/store/auth/authSlice.ts";
import { ROUTES } from "@/app/config/routes.ts";

//TODO: add form input and submit handling

export const AuthForm = ({type}: AuthFormProps) => {
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuth) navigate(ROUTES.USERS, { replace: true });
  }, [isAuth, navigate]);

  const handleSubmit = () => {
      dispatch(login());
  }

  if (!type) return (<>
    <h1>Form type is not provided to Auth Form</h1>
  </>);

  if (type === 'login') return (<>
    <h1>Login Form</h1>
    {!isAuth && (
      <button
        aria-label="Increment value"
        onClick={handleSubmit}
      >
        Login
      </button>)}
  </>);

  if (type === 'register') return (<>
    <h1>Register Form</h1>
    {!isAuth && (
      <button
        aria-label="Increment value"
        onClick={handleSubmit}
      >
        Register
      </button>
    )}
  </>);
}
