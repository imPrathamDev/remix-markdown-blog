import { Link, NavLink } from "@remix-run/react";
import React, { Fragment } from "react";
import logo from "~/assets/rmb.png";

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
          <img src={logo} alt="RMB" className="w-32 h-14 object-contain" />
        </div>
      </Link>

      <div className="pl-8 rounded-full w-full border border-primary-gray flex flex-row items-centers">
        <ul className="flex flex-row items-center gap-x-4 flex-1 py-3">
          {links.map((link, index) => (
            <Fragment key={link.title + index}>
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
            </Fragment>
          ))}
        </ul>
        <div className="px-4 flex justify-center items-center border-l border-primary-gray rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="px-4 flex justify-center items-center border-l border-primary-gray rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M6.28 5.22a.75.75 0 0 1 0 1.06L2.56 10l3.72 3.72a.75.75 0 0 1-1.06 1.06L.97 10.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Zm7.44 0a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 0 1 0-1.06ZM11.377 2.011a.75.75 0 0 1 .612.867l-2.5 14.5a.75.75 0 0 1-1.478-.255l2.5-14.5a.75.75 0 0 1 .866-.612Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <Link to={"/"}>
        <div className="px-6 py-3 rounded-full border border-primary-gray flex flex-row items-centers gap-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
          </svg>
          <span className="text-sm font-light text-gray-400">Login</span>
        </div>
      </Link>
    </header>
  );
}

export default Header;
