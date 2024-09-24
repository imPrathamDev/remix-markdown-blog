import React, { Fragment, useCallback, useMemo } from "react";
import { createSlug, Heading } from "~/helpers/generalHelper";
import { markdownToTxt } from "markdown-to-txt";

/*
 * Recursive React component
 */

function TagItem({ item, isNested }: { item: Heading; isNested: boolean }) {
  const text = useMemo(() => {
    return markdownToTxt(item.text);
  }, [item]);
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
      const element = document.getElementById(createSlug(id));
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, []);
  return (
    <Fragment>
      <li
        onClick={() => handlePress(item.text)}
        className="text-sm font-medium border-b-2 border-primary-black relative overflow-hidden group py-2 px-1 cursor-pointer"
      >
        <span
          style={{
            zIndex: -100,
          }}
          className="absolute bottom-0 translate-y-24 left-0 w-full h-full bg-primary-pink transition-all duration-300 group-hover:translate-y-0"
        ></span>
        <span className="flex items-center justify-between">
          <span className="flex items-center gap-x-1">
            {isNested && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499"
                />
              </svg>
            )}
            {text}{" "}
          </span>
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
      {item.children &&
        item.children.length > 0 &&
        item.children.map((heading, index) => (
          <TagItem
            key={heading.text + index}
            item={heading}
            isNested={heading.children ? heading.children.length > 0 : false}
          />
        ))}
    </Fragment>
  );
}

export default TagItem;
