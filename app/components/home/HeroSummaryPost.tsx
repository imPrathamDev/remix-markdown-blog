import { useMatch } from "@remix-run/react";
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
      <div className="min-h-[35vh] h-full bg-primary-alt-green rounded-3xl left-inverted-radius">
        {headings.map((heading) => (
          <span key={heading}>{heading}</span>
        ))}
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
