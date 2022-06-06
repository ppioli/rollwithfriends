import { Input } from "components/form/Input";
import { Card } from "components/panel/Card";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginWithGoogle } from "components/LoginWithGoogle";

interface LoginCredentials {
  username: string;
  password: string;
}

const loginCredentialsScheme: SchemaOf<LoginCredentials> = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export function Login() {
  const { register, handleSubmit } = useForm<LoginCredentials>({
    resolver: yupResolver(loginCredentialsScheme),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (credentials: LoginCredentials) => console.log(credentials);

  return (
    <div className={"w-screen h-screen flex justify-center content-center"}>
      <div className={"max-w-screen-md h-fit"}>
        <Card>
          <h2>Log in</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={"mb-3"}>
            <div className={"flex flex-col gap-2"}>
              <Input label={"Username"} {...register("username")} />
              <Input label={"Password"} {...register("password")} />
              <button type={"submit"} className={"btn btn-primary"}>
                Log in
              </button>
            </div>
          </form>
          <h2>Or Log in with google....</h2>
          <LoginWithGoogle />
        </Card>
      </div>
    </div>
  );
}
