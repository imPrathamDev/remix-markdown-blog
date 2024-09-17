import { Link, NavLink } from "@remix-run/react";
import React from "react";
import logo from "~/assets/MDB.svg";

function Header() {
  const links = [
    {
      title: "Home",
      to: "/",
    },
    {
      title: "README.md",
      to: "/readme",
    },
    {
      title: "About Me",
      to: "/about",
    },
    {
      title: "Contact",
      to: "/contact",
    },
  ];
  return (
    <header className="py-6 w-full px-28 flex flex-row items-center gap-x-4">
      <Link to={"/"}>
        <div className="flex flex-row items-center">
          <span className="text-3xl font-extrabold text-primary-black">
            RMB.
          </span>
        </div>
      </Link>

      <div className="pl-8 py-3 rounded-full w-full border border-primary-gray">
        <ul className="flex flex-row items-center gap-x-4">
          {links.map((link, index) => (
            <>
              <NavLink
                key={link.title + index}
                to={link.to}
                className={({ isActive, isPending }) =>
                  `text-sm font-light flex flex-row items-center transition-all ${
                    isPending ? "pending" : ""
                  } ${
                    isActive
                      ? "text-primary-black font-normal"
                      : "text-gray-400"
                  }`
                }
              >
                {link.title}
              </NavLink>

              {index !== links.length - 1 && (
                <div className="mx-2 h-1.5 w-1.5 bg-primary-black rounded-full" />
              )}
            </>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Header;
