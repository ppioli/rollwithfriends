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
          "text-gray-300 hover:bg-gray-700 hover:text-white": !active,
          "bg-gray-900 text-white": active,
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
          "hover:text-white hover:bg-gray-700 text-gray-300": !active,
          "bg-gray-900 text-white ": active,
        })
      }
    >
      {label}
    </Link>
  );
}
