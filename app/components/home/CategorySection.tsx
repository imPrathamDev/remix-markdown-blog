import React, { useMemo } from "react";
import TitleAnimation from "./TitleAnimation";

function CategorySection({ blogs }: { blogs: any[] }) {
  const category = "Yoga";
  const filteredPosts = useMemo(() => {
    return blogs.filter(
      (f: any) => f.data && f.data.categories.includes(category)
    );
  }, [blogs]);
  return (
    <section className="py-20">
      <div className="">
        <h3 className="mb-16 ml-12 mt-6 text-6xl font-extrabold italic">
          {category}{" "}
          <span className="text-lg font-light italic">(Category)</span>
        </h3>
        <div className="w-3/5 h-[65vh] rounded-3xl overflow-hidden relative">
          <img
            src={filteredPosts[0].data.thumbnail}
            alt={
              filteredPosts[0].data.title +
              " By " +
              filteredPosts[0].data.author
            }
            className="w-full h-full object-cover rounded-3xl"
          />
          <div className="absolute w-full h-full top-0 left-0 p-12 flex items-end">
            <TitleAnimation title={filteredPosts[0].data.title} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
