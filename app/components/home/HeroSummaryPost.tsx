import { Link } from "@remix-run/react";
import React, { useEffect, useMemo } from "react";
import {
  createSlug,
  getH2HeadingsFromMD,
  getHeadingsFromMD,
} from "~/helpers/generalHelper";

function HeroSummaryPost({
  blogPost,
}: {
  blogPost: {
    content?: string | undefined;
    id: string;
    data: {
      [key: string]: any;
    };
  };
}) {
  const headings = useMemo(() => {
    return getHeadingsFromMD(blogPost.content ?? "")
      .map((h) => [h.text, h.children.map((g) => g.text)])
      .flat()
      .flat()
      .slice(0, 3);
  }, [blogPost]);

  return (
    <div className="col-span-2 row-span-1 lg:row-span-2 lg:col-span-3 relative">
      <div className="lg:min-h-[35vh] lg:h-full bg-primary-alt-green rounded-3xl left-inverted-radius flex flex-col">
        <div className="py-6 px-4 lg:py-8 lg:px-6 flex-1">
          <div className="flex flex-row items-center gap-x-2 text-sm text-primary-black">
            <span className="font-bold">
              Category .{" "}
              <span className="font-normal">{blogPost.data.categories[0]}</span>
            </span>
          </div>
          <Link to={"/blog/" + blogPost.id}>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-balance mt-4">
              {blogPost.data.title}
            </h2>
          </Link>
          <p className="text-gray-600 text-sm lg:text-base font-light mt-2 lg:mt-4 text-balance">
            {blogPost.data.description}
          </p>
        </div>
        <ul className="">
          {headings.map((heading, index) => (
            <Link
              to={"/blog/" + blogPost.id + "#" + createSlug(heading)}
              key={heading + index}
            >
              <div className="px-2 py-1.5 lg:px-6 lg:py-3 border-t-2 border-primary-black relative text-base lg:text-xl uppercase font-bold group overflow-hidden">
                <span
                  style={{ zIndex: -100 }}
                  className="flair absolute bottom-0 translate-y-24 left-0 w-full h-full bg-primary-pink transition-all duration-300 group-hover:translate-y-0"
                ></span>
                <span className=" truncate flex items-center gap-x-2 ">
                  {heading}{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-6 ml-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </ul>
      </div>
      <Link
        to={"/blog/" + blogPost.id}
        className="absolute top-1 right-1 rounded-full bg-primary-alt-green w-[4.5rem] h-[4.5rem] text-primary-black flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="currentColor"
          className="size-9 -rotate-45"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </Link>
    </div>
  );
}

export default HeroSummaryPost;
