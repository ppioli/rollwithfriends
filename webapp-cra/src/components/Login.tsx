import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { GoogleClientId } from "lib/getRelayClientEnvironment";

interface LoginProps {
  onLogin: (response: CredentialResponse) => void;
}

export function Login({ onLogin }: LoginProps) {
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
