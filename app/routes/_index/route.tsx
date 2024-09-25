import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getBlogs } from "~/helpers/blogHelper";
import moment from "moment";
import HeroGrid from "~/components/home/HeroGrid";
import HeroSummaryPost from "~/components/home/HeroSummaryPost";
import VerticalPostGrid from "~/components/home/VerticalPostGrid";
import CategoryGrid from "~/components/home/CategoryGrid";
import HorizontalPostGrid from "~/components/home/HorizontalPostGrid";
import CategorySection from "~/components/home/CategorySection";
export const meta: MetaFunction = () => {
  return [
    { title: "Remix Markdown Blog" },
    {
      name: "description",
      content: "Welcome to Remix Markdown Blog By Pratham Sharma.",
    },
  ];
};

export const loader = async () => {
  const [blogs, categories] = await Promise.all([
    getBlogs({ showContent: true }),
    getBlogs({ showContent: false, fetchItemType: "categories" }),
  ]);
  return json({ ok: true, blogs, categories });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="p-2 lg:p-4 lg:px-28">
      <section className="lg:py-2 grid grid-cols-2 lg:grid-cols-7 gap-1 w-full">
        <HeroGrid blog={data.blogs[0]} />
        <HeroSummaryPost blogPost={data.blogs[1]} />
        <VerticalPostGrid blogPost={data.blogs[2]} />
        <HorizontalPostGrid blogPost={data.blogs[4]} />
        <CategoryGrid categories={data.categories} />
      </section>

      <CategorySection blogs={data.blogs} />
    </main>
  );
}
