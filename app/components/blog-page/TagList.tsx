import React, { useMemo } from "react";
import { createSlug, getH2HeadingsFromMD } from "~/helpers/generalHelper";

function TagList({ content }: { content?: string }) {
  const headings = useMemo(() => {
    let hs = getH2HeadingsFromMD(content ?? "");
    return hs.map((h) => ({
      heading: h,
      hash: createSlug(h),
    }));
  }, [content]);

  if (!content || headings.length <= 0) {
    return null;
  }

  return (
    <div className="py-2">
      <h3 className="text-base font-semibold my-2">On this page</h3>
      <ul className="flex flex-col gap-y-2">
        {headings.map((heading, index) => (
          <li
            key={heading.hash + index}
            className="text-sm font-medium border-b-2 border-primary-black flex items-center justify-between"
          >
            {heading.heading}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.2}
              stroke="currentColor"
              className="size-6"
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
  );
}

export default TagList;
