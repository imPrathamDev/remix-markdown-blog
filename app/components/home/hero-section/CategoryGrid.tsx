import { useGSAP } from "@gsap/react";
import { Link } from "@remix-run/react";
import { gsap } from "gsap";
import React, { useRef } from "react";

function CategoryGrid({ categories }: { categories: string[] }) {
  gsap.registerPlugin(useGSAP);
  const container = useRef();

  useGSAP(
    () => {
      gsap.from(".box", { opacity: 0.1, stagger: 0.1 });
    },
    { scope: container }
  );

  return (
    <div
      ref={container as any}
      className="col-span-2 lg:h-[25vh] bg-primary-alt-green rounded-3xl p-4 flex flex-col"
    >
      <div className="flex flex-wrap justify-end gap-x-2 gap-y-2">
        {categories.slice(0, 10).map((category) => (
          <Link
            to={"/blogs?category=" + encodeURIComponent(category)}
            key={category}
            className="box px-2 py-1 lg:px-2.5 lg:py-1.5 bg-primary-yellow text-xs lg:text-sm rounded-full hover:scale-105 transition-transform"
          >
            {category}
          </Link>
        ))}
      </div>

      <Link
        to={"/blogs?categories=all"}
        className="text-sm lg:text-lg font-semibold flex items-end gap-x-2 flex-1 hover:underline mt-4"
      >
        View All Categories
      </Link>
    </div>
  );
}

export default CategoryGrid;
