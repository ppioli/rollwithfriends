import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { GoogleClientId } from "lib/getRelayClientEnvironment";
import { useSessionContext } from "components/LoginContext";
import { useCallback } from "react";

export function Login() {
  const { login } = useSessionContext();

  const onLogin = useCallback(
    (response: CredentialResponse) => {
      if (response.credential) {
        login(response.credential);
      }
    },
    [login]
  );

  return (
    <div>
      <GoogleOAuthProvider clientId={GoogleClientId}>
        <GoogleLogin
          onSuccess={onLogin}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        />
      </GoogleOAuthProvider>
    </div>
  );
}
