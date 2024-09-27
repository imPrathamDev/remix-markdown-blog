import React, { useMemo } from "react";
import HeroGrid from "./hero-section/HeroGrid";
import HeroSummaryPost from "./hero-section/HeroSummaryPost";
import VerticalPostGrid from "./hero-section/VerticalPostGrid";
import HorizontalPostGrid from "./hero-section/HorizontalPostGrid";
import CategoryGrid from "./hero-section/CategoryGrid";

function HeroSection({
  blogs,
  categories,
}: {
  blogs: any[];
  categories: string[];
}) {
  const componentsArray = useMemo(() => {
    return [HeroGrid, HeroSummaryPost, VerticalPostGrid, HorizontalPostGrid];
  }, [blogs]);
  return (
    <section className="lg:py-2 grid grid-cols-2 lg:grid-cols-7 gap-1 w-full">
      {blogs.map((blog, index) => {
        const Component = componentsArray[index % componentsArray.length];
        return <Component key={blog.id} blogPost={blog} />;
      })}
      <CategoryGrid categories={categories} />
    </section>
  );
}

export default HeroSection;
