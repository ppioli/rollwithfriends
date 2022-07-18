import Link from "next/link";
import { useRouter } from "next/router";

export interface NavLinkProps {
  label: string;
  to: string;
  className: ({ active }: { active: boolean }) => string;
}

export function NavLink({ to, className, label }: NavLinkProps) {
  const router = useRouter();
  return (
    <Link href={to}>
      <a className={className({ active: router.asPath == to })}>{label}</a>
    </Link>
  );
}
