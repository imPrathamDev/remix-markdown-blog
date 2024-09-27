import { Link, unstable_useViewTransitionState } from "@remix-run/react";
import React from "react";
import TitleAnimation from "../TitleAnimation";

function SideFirstHalfPost({ blogPost }: { blogPost: any }) {
  const isTransitioning = unstable_useViewTransitionState(
    "/blog/" + blogPost.id
  );
  return (
    <Link
      to={"/blog/" + blogPost.id}
      unstable_viewTransition
      className="h-4/6 w-full relative"
    >
      <div className="w-full h-full bg-primary-pink rounded-3xl left-inverted-radius">
        <img
          style={{
            ...(isTransitioning && {
              viewTransitionName: blogPost.id,
            }),
          }}
          src={blogPost.data.thumbnail}
          alt={blogPost.data.title + " By " + blogPost.data.author}
          className="w-full h-full object-cover rounded-3xl"
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-end p-4">
          <TitleAnimation title={blogPost.data.title} />
        </div>
      </div>
      <div className="absolute top-1 right-1 rounded-full bg-primary-pink w-[4.5rem] h-[4.5rem] text-primary-black flex justify-center items-center">
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
    </Link>
  );
}

export default SideFirstHalfPost;
