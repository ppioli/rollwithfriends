import { useState } from "react";

export function Login({ onLogin }: any) {
  const [username, setUserName] = useState("admin");
  const [password, setPassword] = useState("1234");

  const login = async (e: any) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  return (
    <div>
      <form onSubmit={login}>
        Login: Username:{" "}
        <input value={username} onChange={(e) => setUserName(e.target.value)} />
        Password:{" "}
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type={"submit"}>Log in</button>
      </form>
    </div>
  );
}
