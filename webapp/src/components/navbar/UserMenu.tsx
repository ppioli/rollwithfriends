import { useMemo } from "react";
import classNames from "classnames";
import { useToggle } from "utils/hooks/useToggle";
import { useSessionContext } from "components/LoginContext";

interface UserInfo {
  picture: string;
  name: string;
  email: string;
}

export function UserMenu() {
  const { logout } = useSessionContext();
  const [show, toggle] = useToggle(false);

  const userProfile = useMemo((): UserInfo => {
    // if (tokenRef.current === null) {
    //   throw new Error("Invalid state");
    // }
    // return jwt_decode(tokenRef.current) as UserInfo;
    return {
      picture:
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      email: "example@email.com",
      name: "user",
    };
  }, []);

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <button
        type="button"
        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        <span className="sr-only">View notifications</span>
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </button>

      <div className={"ml-3 relative"}>
        <div>
          <button
            onClick={toggle}
            type="button"
            className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full"
              src={userProfile.picture}
              alt=""
            />
          </button>
        </div>

        <div
          className={classNames(
            { hidden: !show },
            "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-darkest ring-1 ring-black ring-opacity-5 focus:outline-none z-[99999]"
          )}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          <a
            href="components/navbar/Navbar#"
            className="block px-4 py-2 text-sm"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-0"
          >
            Your Profile
          </a>
          <a
            href="components/navbar/Navbar#"
            className="block px-4 py-2 text-sm "
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-1"
          >
            Settings
          </a>
          <a
            href="components/navbar/Navbar#"
            className="block px-4 py-2 text-sm"
            role="menuitem"
            tabIndex={-1}
            onClick={logout}
            id="user-menu-item-2"
          >
            Sign out
          </a>
        </div>
      </div>
    </div>
  );
}
