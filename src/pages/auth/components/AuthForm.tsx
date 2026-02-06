import type {AuthFormProps} from "@/app/types/AuthFormTypes.ts";

//TODO: add form input and submit handling

export const AuthForm = ({ type }: AuthFormProps ) => {
  if (!type) return (<>
    <h1>Form type is not provided to Auth Form</h1>
  </>);

  if (type === 'login') return (<>
    <h1>Login Form</h1>
  </>);

  if (type === 'register') return (<>
    <h1>Register Form</h1>
  </>);
}
