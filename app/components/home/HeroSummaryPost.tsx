import { useMatch } from "@remix-run/react";
import moment from "moment";
import React, { useMemo } from "react";
import { getH2HeadingsFromMD } from "~/helpers/generalHelper";

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
    return getH2HeadingsFromMD(blogPost.content ?? "");
  }, [blogPost]);

  return (
    <div className="row-span-2 col-span-3 relative">
      <div className="min-h-[35vh] h-full bg-primary-alt-green rounded-3xl left-inverted-radius flex flex-col">
        <div className="py-8 px-6 flex-1">
          <div className="flex flex-row items-center gap-x-2 text-sm text-primary-black">
            <span className="font-bold">
              Category .{" "}
              <span className="font-normal">{blogPost.data.categories[0]}</span>
            </span>
          </div>
          <h2 className="text-5xl font-extrabold text-balance mt-4">
            {blogPost.data.title}
          </h2>
          <p className="text-gray-600 font-medium mt-4">
            {blogPost.data.description}
          </p>
        </div>
        <ul className="">
          {headings.map((heading, index) => (
            <li
              key={heading + index}
              className="px-6 py-3 border-t-2 border-primary-black text-xl uppercase font-bold truncate flex items-center gap-x-2"
            >
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
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute top-1 right-1 rounded-full bg-primary-alt-green w-[4.5rem] h-[4.5rem] text-primary-black flex justify-center items-center">
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
      </div>
    </div>
  );
}

export default HeroSummaryPost;
