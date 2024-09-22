import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getBlogs } from "~/helpers/blogHelper";
import moment from "moment";
import HeroGrid from "~/components/home/HeroGrid";
import HeroSummaryPost from "~/components/home/HeroSummaryPost";
import VerticalPostGrid from "~/components/home/VerticalPostGrid";
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
  const blogs = await getBlogs({ showContent: true });
  return json({ ok: true, blogs });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="p-4">
      <section className="px-28 py-2">
        <h2 className="text-5xl font-extrabold text-primary-black my-2">
          BLOG
        </h2>
        <div className="mt-8 grid grid-cols-7 gap-1 w-full">
          <HeroGrid blog={data.blogs[0]} />
          <HeroSummaryPost blogPost={data.blogs[1]} />
          <VerticalPostGrid blogPost={data.blogs[2]} />
          <div className="col-span-2 h-[25vh] bg-primary-green rounded-3xl"></div>
          <div className="col-span-2 h-[25vh] bg-primary-alt-green rounded-3xl"></div>
        </div>
      </section>
    </div>
  );
}
