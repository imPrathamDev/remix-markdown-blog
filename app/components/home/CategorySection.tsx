import React, { useMemo } from "react";

function CategorySection({ blogs }: { blogs: any[] }) {
  const filteredPosts = useMemo(() => {
    return blogs.filter(
      (f: any) => f.data && f.data.categories.includes("Yoga")
    );
  }, [blogs]);
  return (
    <section className="flex py-12">
      <div className="w-3/5 h-[60vh] rounded-3xl overflow-hidden relative">
        <img
          src={filteredPosts[0].data.thumbnail}
          alt={
            filteredPosts[0].data.title + " By " + filteredPosts[0].data.author
          }
          className="w-full h-full object-cover rounded-3xl"
        />
        <div className="absolute w-full h-full top-0 left-0"></div>
      </div>
    </section>
  );
}

export default CategorySection;
