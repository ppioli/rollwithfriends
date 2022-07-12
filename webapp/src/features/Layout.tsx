import { Navbar } from "components/navbar/Navbar";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  const { data, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const token = data.accessToken;

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
