import { Link, unstable_useViewTransitionState } from "@remix-run/react";
import moment from "moment";
import React from "react";
import bg from "~/assets/background.jpg";
function HorizontalPostGrid({
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
  const isTransitioning = unstable_useViewTransitionState(
    "/blog/" + blogPost.id
  );
  return (
    <Link
      to={"/blog/" + blogPost.id}
      className="col-span-2 h-[25vh] bg-primary-green rounded-3xl overflow-hidden relative"
      unstable_viewTransition
    >
      <img
        src={blogPost.data.thumbnail}
        alt={blogPost.data.title + " By " + blogPost.data.author}
        className="w-full h-full object-cover"
        style={{
          ...(isTransitioning && {
            viewTransitionName: blogPost.id,
          }),
        }}
      />
      <div className="w-full h-full absolute top-0 left-0 flex flex-col justify-between bg-primary-black/20 text-primary-white">
        <span className="font-bold text-xs px-4 pt-4">
          Category .{" "}
          <span className="font-normal">{blogPost.data.categories[0]}</span>
        </span>
        <div className="px-4 py-2">
          <span className="text-xs mb-1 text-gray-200">
            {moment(blogPost.data.date).format("Do MMMM")}
          </span>
          <h2 className="text-xl font-bold uppercase">{blogPost.data.title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HorizontalPostGrid;
