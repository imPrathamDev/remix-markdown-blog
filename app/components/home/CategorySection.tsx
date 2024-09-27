import React, { useMemo } from "react";
import TitleAnimation from "./TitleAnimation";
import moment from "moment";
import { Link, unstable_useViewTransitionState } from "@remix-run/react";
import LargePost from "./category-section/LargePost";
import SideFirstHalfPost from "./category-section/SideFirstHalfPost";
import SideSecondHalf from "./category-section/SideSecondHalf";

function CategorySection({ blogs }: { blogs: any[] }) {
  const category = "Yoga";
  const filteredPosts = useMemo(() => {
    return blogs.filter(
      (f: any) => f.data && f.data.categories.includes(category)
    );
  }, [blogs]);

  return (
    <section className="lg:py-20 grid grid-cols-1 gap-y-4 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0">
      <div className="col-span-1 lg:col-span-3">
        <h3 className="mb-6 lg:mb-16 ml-4 lg:ml-12 mt-6 text-6xl font-extrabold italic">
          {category}{" "}
          <span className="text-lg font-light italic">(Category)</span>
        </h3>
        <LargePost blogPost={filteredPosts[0]} />
      </div>
      <div className="col-span-2 flex flex-col gap-y-6">
        <SideFirstHalfPost blogPost={filteredPosts[1]} />
        <SideSecondHalf blogPost={filteredPosts[2]} />
      </div>
    </section>
  );
}

export default CategorySection;
