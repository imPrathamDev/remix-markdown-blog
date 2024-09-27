import { Link, unstable_useViewTransitionState } from "@remix-run/react";
import moment from "moment";
import React from "react";
import TitleAnimation from "../TitleAnimation";

function LargePost({ blogPost }: { blogPost: any }) {
  const isTransitioning = unstable_useViewTransitionState(
    "/blog/" + blogPost.id
  );
  return (
    <Link to={"/blog/" + blogPost.id} unstable_viewTransition>
      <div className="w-full h-[50vh] lg:h-[65vh] rounded-3xl overflow-hidden relative">
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
        <div className="absolute w-full h-full top-0 left-0 p-2 lg:p-12 flex flex-col justify-between">
          <div className="flex flex-col items-end w-full text-xs lg:text-sm font-semibold gap-y-2">
            <div className="px-4 py-2 bg-primary-white rounded-full">
              <span>{moment(blogPost.data.date).format("Do MMM YYYY")}</span>
            </div>

            <div className="px-4 py-2 bg-primary-white rounded-full">
              <span>{blogPost.data.author}</span>
            </div>
          </div>
          <TitleAnimation title={blogPost.data.title} />
        </div>
      </div>
    </Link>
  );
}

export default LargePost;
