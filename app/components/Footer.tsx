import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-2 my-2 bg-primary-black rounded-2xl px-8 pt-8 pb-8 lg:px-12 lg:pt-24 lg:pb-12 text-primary-white mt-6">
      <div className="my-12 lg:my-6">
        <img
          src="/rmb.png"
          alt="RMB"
          className="invert w-44 h-28 object-contain my-1"
        />

        <p className="text-sm font-light">
          Remix Markdown Blog created for studying remix and it's fundamentals.
        </p>
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-y-6 lg:gap-y-0 lg:items-end lg:justify-between my-2">
        <span className="text-xs lg:text-sm font-light text-primary-gray">
          © {year} RMB By Pratham Sharma. All rights reserved.
        </span>

        <div className="">
          <span className="text-sm font-semibold my-2 text-primary-gray">
            Design <span className="text-primary-pink">&</span> Developed By
          </span>
          <h5 className="text-5xl uppercase font-extrabold">
            Pratham Sha<span className="text-primary-alt-green">r</span>ma
          </h5>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
