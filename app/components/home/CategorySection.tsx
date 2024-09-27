import React, { useMemo } from "react";
import TitleAnimation from "./TitleAnimation";
import moment from "moment";
import { Link, unstable_useViewTransitionState } from "@remix-run/react";

function CategorySection({ blogs }: { blogs: any[] }) {
  const category = "Yoga";
  const filteredPosts = useMemo(() => {
    return blogs.filter(
      (f: any) => f.data && f.data.categories.includes(category)
    );
  }, [blogs]);
  const isTransitioning = unstable_useViewTransitionState(
    "/blog/" + filteredPosts[0].id
  );
  return (
    <section className="lg:py-20 grid grid-cols-1 gap-y-4 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0">
      <div className="col-span-1 lg:col-span-3">
        <h3 className="mb-6 lg:mb-16 ml-4 lg:ml-12 mt-6 text-6xl font-extrabold italic">
          {category}{" "}
          <span className="text-lg font-light italic">(Category)</span>
        </h3>
        <Link to={"/blog/" + filteredPosts[0].id} unstable_viewTransition>
          <div className="w-full h-[50vh] lg:h-[65vh] rounded-3xl overflow-hidden relative">
            <img
              style={{
                ...(isTransitioning && {
                  viewTransitionName: filteredPosts[0].id,
                }),
              }}
              src={filteredPosts[0].data.thumbnail}
              alt={
                filteredPosts[0].data.title +
                " By " +
                filteredPosts[0].data.author
              }
              className="w-full h-full object-cover rounded-3xl"
            />
            <div className="absolute w-full h-full top-0 left-0 p-2 lg:p-12 flex flex-col justify-between">
              <div className="flex flex-col items-end w-full text-xs lg:text-sm font-semibold gap-y-2">
                <div className="px-4 py-2 bg-primary-white rounded-full">
                  <span>
                    {moment(filteredPosts[0].data.date).format("Do MMM YYYY")}
                  </span>
                </div>

                <div className="px-4 py-2 bg-primary-white rounded-full">
                  <span>{filteredPosts[0].data.author}</span>
                </div>
              </div>
              <TitleAnimation title={filteredPosts[0].data.title} />
            </div>
          </div>
        </Link>
      </div>
      <div className="col-span-2 flex flex-col gap-y-6">
        <div className="h-4/6 w-full relative">
          <div className="w-full h-full bg-primary-pink rounded-3xl left-inverted-radius">
            <img
              style={{
                ...(isTransitioning && {
                  viewTransitionName: filteredPosts[1].id,
                }),
              }}
              src={filteredPosts[1].data.thumbnail}
              alt={
                filteredPosts[1].data.title +
                " By " +
                filteredPosts[1].data.author
              }
              className="w-full h-full object-cover rounded-3xl"
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-end p-4">
              <TitleAnimation title={filteredPosts[1].data.title} />
            </div>
          </div>
          <Link
            to={"/blog/" + filteredPosts[1].id}
            className="absolute top-1 right-1 rounded-full bg-primary-pink w-[4.5rem] h-[4.5rem] text-primary-black flex justify-center items-center"
          >
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
          </Link>
        </div>

        <Link
          to={"/blog/" + filteredPosts[2].id}
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
              <span>{filteredPosts[2].data.author}</span>
              <span>-</span>
              <span>
                {moment(filteredPosts[2].data.date).format("DD MMMM")}
              </span>
            </div>
            <h2
              style={{
                ...(isTransitioning && {
                  viewTransitionName: filteredPosts[2].id + "-text",
                }),
              }}
              className="text-base lg:text-3xl uppercase font-bold"
            >
              {filteredPosts[2].data.title}
            </h2>
            <p className="text-xs lg:text-sm text-gray-600 mt-1">
              {filteredPosts[2].data.description}
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default CategorySection;
