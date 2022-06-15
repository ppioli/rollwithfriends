import { Input } from "components/form/Input";
import { Card } from "components/panel/Card";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginWithGoogle } from "components/LoginWithGoogle";
import { useSessionContext } from "components/LoginContext";
import { fetchAccessTokenWithPassword } from "lib/useRefreshToken";

interface LoginCredentials {
  username: string;
  password: string;
}

const loginCredentialsScheme: SchemaOf<LoginCredentials> = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export function Login() {
  const { setResponse } = useSessionContext();
  const { register, handleSubmit } = useForm<LoginCredentials>({
    resolver: yupResolver(loginCredentialsScheme),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (credentials: LoginCredentials) => {
    const response = await fetchAccessTokenWithPassword(credentials);
    setResponse(response);
  };

  return (
    <div className={"w-screen h-screen flex justify-center items-center"}>
      <div className={"max-w-screen-md h-fit"}>
        <Card layout={"flex flex-col"}>
          <div className={"p-4"}>
            <div className={"p-4 mb-4"}>
              <h1 className={"text-center mb-2"}>Welcome</h1>
              <h4 className={"text-center"}>
                Enter your credentials and let's get started!
              </h4>
            </div>
            <div className={"flex"}>
              <div className={"w-96"}>
                <form onSubmit={handleSubmit(onSubmit)} className={"mb-3"}>
                  <div className={"flex flex-col gap-2"}>
                    <Input label={"Username"} {...register("username")} />
                    <Input
                      label={"Password"}
                      input={{ type: "password" }}
                      {...register("password")}
                      layout={"mt-4"}
                    />
                    <button type={"submit"} className={"btn btn-primary mt-4"}>
                      Login
                    </button>
                  </div>
                </form>
              </div>

              <div
                className={
                  "w-64 ml-6 pl-6 border-l-2 border-light flex justify-center align-middle"
                }
              >
                <LoginWithGoogle />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
