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
    <section className="py-20">
      <div className="">
        <h3 className="mb-16 ml-12 mt-6 text-6xl font-extrabold italic">
          {category}{" "}
          <span className="text-lg font-light italic">(Category)</span>
        </h3>
        <Link to={"/blog/" + filteredPosts[0].id} unstable_viewTransition>
          <div className="w-3/5 h-[65vh] rounded-3xl overflow-hidden relative">
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
            <div className="absolute w-full h-full top-0 left-0 p-12 flex flex-col justify-between">
              <div className="flex flex-col items-end w-full text-sm font-semibold gap-y-2">
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
    </section>
  );
}

export default CategorySection;
