import { UserMenu } from "components/navbar/UserMenu";
import { MenuToggleButton } from "components/navbar/MenuToggleButton";
import {
  NavbarItem,
  NavbarItemMini,
  NavbarItemProps,
} from "components/navbar/NavbarItem";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import classNames from "classnames";
import { useToggle } from "utils/hooks/useToggle";
import { Login } from "components/Login";
import { useSessionContext } from "components/LoginContext";

const navbarMenuItems: Omit<NavbarItemProps, "selected">[] = [
  { label: "Home", href: "/home" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Campaigns", href: "/campaign" },
];

export function Navbar() {
  const [menuOpen, toggle] = useToggle(false);
  const { isLoggedIn } = useSessionContext();

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <MenuToggleButton onClick={toggle} />
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                alt="Workflow"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {navbarMenuItems.map((r, ix) => (
                  <NavbarItem key={ix} {...r} />
                ))}
              </div>
            </div>
          </div>
          {isLoggedIn ? <UserMenu /> : <Login />}
        </div>
      </div>

      <div
        className={classNames("sm:hidden", {
          hidden: !menuOpen,
        })}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navbarMenuItems.map((r, ix) => (
            <NavbarItemMini key={ix} {...r} />
          ))}
        </div>
      </div>
    </nav>
  );
}
