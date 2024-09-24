import React, { useCallback, useMemo } from "react";
import { createSlug, getH2HeadingsFromMD } from "~/helpers/generalHelper";

function TagList({ content }: { content?: string }) {
  const headings = useMemo(() => {
    let hs = getH2HeadingsFromMD(content ?? "");
    return hs.map((h) => ({
      heading: h,
      hash: createSlug(h),
    }));
  }, [content]);

  // const navigate = useNavigate();

  const handlePress = useCallback((id: string) => {
    /*
     * For now i am using client side js for scrolling to id.
     * I will decide later what method should I use
     * You can also navigate but animation will not work
     */
    // navigate({
    //   hash: "#" + id,
    // });
    if (typeof window !== "undefined") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, []);

  if (!content || headings.length <= 0) {
    return null;
  }

  return (
    <div className="py-2">
      <h3 className="text-base font-semibold my-2">On this page</h3>
      <ul className="">
        {headings.map((heading, index) => (
          <li
            key={heading.hash + index}
            onClick={() => handlePress(heading.hash)}
            className="text-sm font-medium border-b-2 border-primary-black relative overflow-hidden group py-2 px-1"
          >
            <span
              style={{
                zIndex: -100,
              }}
              className="absolute bottom-0 translate-y-24 left-0 w-full h-full bg-primary-pink transition-all duration-300 group-hover:translate-y-0"
            ></span>
            <span className="flex items-center justify-between">
              {heading.heading}{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.2}
                stroke="currentColor"
                className="size-6 group-hover:scale-x-125 transition-all"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TagList;
