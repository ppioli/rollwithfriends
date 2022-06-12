import { UserMenu } from "components/navbar/UserMenu";
import { MenuToggleButton } from "components/navbar/MenuToggleButton";
import {
  NavbarItem,
  NavbarItemMini,
  NavbarItemProps,
} from "components/navbar/NavbarItem";
import classNames from "classnames";
import { useToggle } from "utils/hooks/useToggle";
import { Dice, DiceType } from "components/dices/Dice";

const navbarMenuItems: NavbarItemProps[] = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Campaigns", href: "/campaign" },
];

export function Navbar() {
  const [menuOpen, toggle] = useToggle(false);

  return (
    <nav className="navbar">
      <div className={"bg-darker h-16"}>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <MenuToggleButton onClick={toggle} />
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <div className="block  h-8 w-auto">
                  <Dice type={DiceType.D20} size={36} />
                </div>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {navbarMenuItems.map((r, ix) => (
                    <NavbarItem key={ix} {...r} />
                  ))}
                </div>
              </div>
            </div>

            <UserMenu />
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
      </div>
    </nav>
  );
}
