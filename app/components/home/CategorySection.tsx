import React, { useMemo } from "react";

function CategorySection({ blogs }: { blogs: any[] }) {
  const filteredPosts = useMemo(() => {
    return blogs.filter(
      (f: any) => f.data && f.data.categories.includes("Fitness")
    );
  }, [blogs]);
  return (
    <section className="flex">
      <div className="w-3/5 h-[50vh]">
        {filteredPosts.map((p: any) => (
          <p key={p.id}>{p.data.title}</p>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
