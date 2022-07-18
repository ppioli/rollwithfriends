import { Navbar } from "components/navbar/Navbar";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import { setToken } from "lib/getRelayClientEnvironment";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
