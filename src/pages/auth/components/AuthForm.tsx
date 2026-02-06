import type {AuthFormProps} from "@/app/types/AuthFormTypes.ts";
import {useDispatch, useSelector} from "react-redux";

import {login} from "@/shared/store/auth/authSlice.ts";
import type {RootState} from "@/app/store.ts";

//TODO: add form input and submit handling

export const AuthForm = ({type}: AuthFormProps) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const dispatch = useDispatch()

  if (!type) return (<>
    <h1>Form type is not provided to Auth Form</h1>
  </>);

  if (type === 'login') return (<>
    <h1>Login Form</h1>
    {!isAuth && (
      <button
        aria-label="Increment value"
        onClick={() => dispatch(login())}
      >
        Login
      </button>)}
  </>);

  if (type === 'register') return (<>
    <h1>Register Form</h1>
    {!isAuth && (
      <button
        aria-label="Increment value"
        onClick={() => dispatch(login())}
      >
        Register
      </button>
    )}
  </>);
}
