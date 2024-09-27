import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getBlogs } from "~/helpers/blogHelper";
import CategorySection from "~/components/home/CategorySection";
import HeroSection from "~/components/home/HeroSection";
import { useMemo } from "react";

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
  const filteredCategory = "Yoga";
  const heroBlogs = useMemo(() => {
    return data.blogs.filter(
      (f: any) => !f.data.categories.includes(filteredCategory)
    );
  }, [data]);

  return (
    <main className="p-2 lg:p-4 lg:px-28">
      <HeroSection blogs={heroBlogs} categories={data.categories} />
      <CategorySection blogs={data.blogs} />
    </main>
  );
}
