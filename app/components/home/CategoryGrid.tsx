import React from "react";

function CategoryGrid({ categories }: { categories: string[] }) {
  return (
    <div className="col-span-2 lg:h-[25vh] bg-primary-alt-green rounded-3xl p-4 flex flex-col">
      <div className="flex flex-wrap justify-end gap-x-2 gap-y-2">
        {categories.slice(0, 10).map((category) => (
          <span
            key={category}
            className="px-2 py-1 lg:px-2.5 lg:py-1.5 bg-primary-yellow text-xs lg:text-sm rounded-full"
          >
            {category}
          </span>
        ))}
      </div>

      <button className="text-sm lg:text-lg font-semibold flex items-end gap-x-2 flex-1 hover:underline mt-4">
        View All Categories
      </button>
    </div>
  );
}

export default CategoryGrid;
