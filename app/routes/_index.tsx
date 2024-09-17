import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getBlogs, searchBlogs } from "~/helpers/blogHelper";
import bg from "~/assets/background.jpg";

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
        <div className="mt-8">
          <div className="h-[60vh] w-1/4 bg-primary-pink rounded-3xl overflow-hidden relative">
            <img src={bg} alt="Background" />
            <div className="absolute bottom-0 test">
              <h2 className="bg-white px-3 py-2 rounded-r-full">
                Hi test me daddy
              </h2>
              <h2 className="bg-white px-3 py-2 rounded-r-full">
                Hi test me daddy harder.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="">
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
      </div> */}
    </div>
  );
}
