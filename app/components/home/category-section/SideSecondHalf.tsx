import { Link, unstable_useViewTransitionState } from "@remix-run/react";
import moment from "moment";
import React from "react";

function SideSecondHalf({ blogPost }: { blogPost: any }) {
  const isTransitioning = unstable_useViewTransitionState(
    "/blog/" + blogPost.id
  );
  return (
    <Link
      to={"/blog/" + blogPost.id}
      className="h-full lg:h-[33%]"
      unstable_viewTransition
    >
      <div
        className="bg-primary-alt-green rounded-3xl w-full h-full p-5 pb-8 lg:pb-0 lg:p-4 relative overflow-hidden group"
        style={{
          zIndex: 1,
        }}
      >
        <span
          style={{ zIndex: -100 }}
          className="h-40 w-40 absolute -bottom-16 -right-4 rounded-full bg-primary-pink group-hover:w-full group-hover:h-80 group-hover:scale-150  transition-all duration-500"
        ></span>
        <span className="flex items-center gap-x-1 text-sm lg:text-lg font-semibold absolute bottom-2 right-4 lg:bottom-4 lg:right-6 translate-y-40 group-hover:translate-y-0 transition-all underline">
          Read The Article{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-4 lg:size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </span>
        <div className="flex items-center gap-x-2 text-xs text-primary-black/80 font-semibold italic mb-1">
          <span>{blogPost.data.author}</span>
          <span>-</span>
          <span>{moment(blogPost.data.date).format("DD MMMM")}</span>
        </div>
        <h2
          style={{
            ...(isTransitioning && {
              viewTransitionName: blogPost.id + "-text",
            }),
          }}
          className="text-base lg:text-3xl uppercase font-bold"
        >
          {blogPost.data.title}
        </h2>
        <p className="text-xs lg:text-sm text-gray-600 mt-1">
          {blogPost.data.description}
        </p>
      </div>
    </Link>
  );
}

export default SideSecondHalf;
