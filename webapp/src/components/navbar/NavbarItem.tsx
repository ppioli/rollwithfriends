import classNames from "classnames";
import { Link } from "components/Link";

export interface NavbarItemProps {
  label: string;
  href: string;
}

export function NavbarItem({ label, href }: NavbarItemProps) {
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <Link
      to={href}
      className={(active: boolean) =>
        classNames("px-3 py-2 rounded-md text-sm font-medium", {
          "hover:bg-darkest": !active,
          "bg-darkest": active,
        })
      }
    >
      {label}
    </Link>
  );
}

export function NavbarItemMini({ href, label }: NavbarItemProps) {
  return (
    <Link
      to={href}
      className={(active: boolean) =>
        classNames("block px-3 py-2 rounded-md text-base font-medium", {
          "hover:bg-darkest": !active,
          "bg-darkest": active,
        })
      }
    >
      {label}
    </Link>
  );
}
