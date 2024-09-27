import React, { useMemo } from "react";
import { divideLines } from "~/helpers/generalHelper";
import bg from "~/assets/background.jpg";
import fire from "~/assets/fire.png";
import moment from "moment";
import { Link, unstable_useViewTransitionState } from "@remix-run/react";

function HeroGrid({
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
  const lines = useMemo(() => {
    return divideLines(blogPost.data.title);
  }, [blogPost]);
  const isTransitioning = unstable_useViewTransitionState(
    "/blog/" + blogPost.id
  );
  return (
    <Link
      to={"/blog/" + blogPost.id}
      className="row-span-2 col-span-2 lg:col-span-3 lg:row-span-3 group"
      unstable_viewTransition
    >
      <div className="lg:h-[95%] w-full bg-primary-pink rounded-t-3xl rounded-br-3xl  overflow-hidden relative">
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
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between">
          <div className="mt-4 ml-4 w-12 h-12 rounded-full flex justify-center items-center bg-primary-white/0 backdrop-blur-sm text-primary-white">
            {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg> */}
            <img
              src={fire}
              alt="Fire Emoji"
              className="object-contain size-6"
            />
          </div>
          <div className="">
            <div className="w-fit relative hero-box-image">
              <div className="flex flex-row items-center gap-x-2 text-xs text-primary-black pt-3 pb-2 px-2 bg-primary-white rounded-tr-2xl test3">
                <span className="font-bold">
                  Category .{" "}
                  <span className="font-normal">
                    {blogPost.data.categories[0]}
                  </span>
                </span>

                <span className="text-primary-black">|</span>

                <span className="text-gray-400 font-light">
                  {moment(blogPost.data.date).format("Do MMM")}
                </span>
              </div>
            </div>
            <div className="w-fit relative">
              <div
                className={`bg-primary-white pl-1 lg:pl-2 rounded-tr-2xl w-fit pr-1 lg:pr-8 py-2 firstLine`}
              >
                <h2 className="truncate text-xl lg:text-4xl text-primary-black font-extrabold">
                  {lines[0]}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`bg-primary-white pl-1 lg:pl-2 rounded-tr-2xl pr-8 pt-2 pb-4 secondLine`}
      >
        <h2 className="truncate text-xl lg:text-4xl font-extrabold">
          {lines[1]}
        </h2>
      </div>
    </Link>
  );
}

export default HeroGrid;
