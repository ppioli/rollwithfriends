import classNames from "classnames";
import { NavLink } from "react-router-dom";

export interface NavbarItemProps {
  label: string;
  href: string;
}

export function NavbarItem({ label, href }: NavbarItemProps) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        classNames("px-3 py-2 rounded-md text-sm font-medium", {
          "text-gray-300 hover:bg-gray-700 hover:text-white": !isActive,
          "bg-gray-900 text-white": isActive,
        })
      }
    >
      {label}
    </NavLink>
  );
}

export function NavbarItemMini({ href, label }: NavbarItemProps) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        classNames("block px-3 py-2 rounded-md text-base font-medium", {
          "hover:text-white hover:bg-gray-700 text-gray-300": !isActive,
          "bg-gray-900 text-white ": isActive,
        })
      }
    >
      {label}
    </NavLink>
  );
}
