import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getBlogs, searchBlogs } from "helpers/blogHelper";

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
      <h1 className="text-3xl text-black font-inter">Remix Markdown Blog</h1>
      <div className="">
        {data.ok &&
          data.blogs.map((blog, index) => (
            <Link key={blog.id} to={"/blog/" + blog.id}>
              <div className="px-2 py-1.5 bg-gray-100 hover:bg-gray-300 transition-all rounded-2xl my-1">
                <div className="flex flex-row items-center gap-x-1">
                  <h2 className="text-xl text-gray-900 my-1">
                    {index + 1}. {blog.data.title}
                  </h2>
                </div>
                <p>{blog.data.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
