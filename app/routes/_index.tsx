import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getBlogs } from "~/helpers/blogHelper";
import moment from "moment";
import HeroGrid from "~/components/home/HeroGrid";
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
  const blogs = await getBlogs({});
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
        <div className="mt-8 grid grid-cols-5 gap-1 w-full">
          <HeroGrid blog={data.blogs[0]} />
          <div className="col-span-2 h-[35vh] bg-primary-alt-green rounded-3xl grid-"></div>
          <div className="h-[35vh] bg-primary-pink rounded-3xl"></div>
          <div className="col-span-1 min-h-14 h-full bg-primary-green rounded-3xl"></div>
          <div className="h-[35vh] bg-primary-alt-green rounded-3xl"></div>
        </div>
      </section>
    </div>
  );
}
