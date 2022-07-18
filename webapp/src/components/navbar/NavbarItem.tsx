import classNames from "classnames";
import Link from "next/link";
import { NavLink } from "components/navbar/NavLink";

export interface NavbarItemProps {
  label: string;
  href: string;
}

export function NavbarItem({ label, href }: NavbarItemProps) {
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <NavLink
      to={href}
      label={label}
      className={({ active }) =>
        classNames("px-3 py-2 rounded-md text-sm font-medium", {
          "hover:bg-darkest": !active,
          "bg-darkest": active,
        })
      }
    />
  );
}

export function NavbarItemMini({ href, label }: NavbarItemProps) {
  return (
    <NavLink
      to={href}
      label={label}
      className={({ active }) =>
        classNames("block px-3 py-2 rounded-md text-base font-medium", {
          "hover:bg-darkest": !active,
          "bg-darkest": active,
        })
      }
    />
  );
}
