import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { GoogleClientId } from "lib/getRelayClientEnvironment";
import { useSessionContext } from "components/LoginContext";
import { useCallback } from "react";
import {
  fetchAccessTokenWithCredential,
  LoginResponse,
} from "lib/useRefreshToken";

export function LoginWithGoogle() {
  const { setResponse } = useSessionContext();

  const onLogin = useCallback(
    async (response: CredentialResponse) => {
      if (response.credential) {
        const loginResponse = await fetchAccessTokenWithCredential(response);

        setResponse(loginResponse as LoginResponse);
      }
    },
    [setResponse]
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
