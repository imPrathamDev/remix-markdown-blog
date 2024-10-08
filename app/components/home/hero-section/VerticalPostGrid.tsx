import { Link, unstable_useViewTransitionState } from "@remix-run/react";
import moment from "moment";
import React from "react";

function VerticalPostGrid({
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
    <div
      style={{
        zIndex: 0,
      }}
      className="row-span-2 col-span-2 lg:col-span-1 min-h-[35vh] h-full bg-primary-pink rounded-3xl relative overflow-hidden group"
    >
      <span className="font-bold absolute top-4 left-2 text-xs">
        Category .{" "}
        <span className="font-normal">{blogPost.data.categories[0]}</span>
      </span>

      <div className="pt-12 px-2">
        <span className="text-gray-600 font-light text-xs">
          {moment(blogPost.data.date).format("Do MMM")}
        </span>
        <h2
          style={{
            ...(isTransitioning && {
              viewTransitionName: blogPost.id + "-text",
            }),
          }}
          className="text-lg lg:text-xl font-extrabold text-balance"
        >
          {blogPost.data.title}
        </h2>
      </div>

      <div
        style={{
          zIndex: -100,
        }}
        className="w-40 h-40 lg:w-64 lg:h-64 bg-primary-green rounded-full absolute -bottom-10 -right-12 group-hover:scale-150 transition-all"
      ></div>

      <div className="absolute bottom-4 right-4">
        <Link
          to={"/blog/" + blogPost.id}
          className="text-xs lg:text-base font-semibold underline"
          unstable_viewTransition
        >
          Read Article
        </Link>
      </div>
    </div>
  );
}

export default VerticalPostGrid;
