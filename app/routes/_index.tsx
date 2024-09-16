import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getBlogs } from "helpers/blogHelper";

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
    <div className="font-sans p-4">
      <h1 className="text-3xl text-black">Remix Markdown Blog</h1>
      <div className="">
        {data.ok &&
          data.blogs.map((blog) => (
            <Link key={blog.id} to={"/blog/" + blog.id}>
              <div>
                <h2>{blog.data.title}</h2>
                <p>{blog.data.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
