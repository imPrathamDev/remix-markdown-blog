import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getBlogs, searchBlogs } from "~/helpers/blogHelper";
import bg from "~/assets/background.jpg";
import moment from "moment";
import { useMemo } from "react";
import { divideLines } from "~/helpers/generalHelper";

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
  const lines = useMemo(() => {
    return divideLines(data.blogs[4].data.title);
  }, [data]);
  return (
    <div className="p-4">
      <section className="px-28 py-2">
        <h2 className="text-5xl font-extrabold text-primary-black my-2">
          BLOG
        </h2>
        <div className="mt-8">
          <div className="hero-box-image h-[70vh] w-[40%] bg-primary-pink rounded-3xl overflow-hidden relative">
            <img
              src={bg}
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 w-4/6 h-[16vh]">
              <div className="w-fit relative">
                <div className="flex flex-row items-center gap-x-2 text-xs text-primary-black pt-3 pb-2 px-2 bg-white rounded-tr-2xl test3">
                  <span className="font-bold">
                    Category .{" "}
                    <span className="font-normal">
                      {data.blogs[0].data.categories[0]}
                    </span>
                  </span>

                  <span className="text-primary-black">|</span>

                  <span className="text-gray-400 font-light">
                    {moment(data.blogs[0].data.date).format("Do MMM")}
                  </span>
                </div>
              </div>

              <div className="w-fit relative">
                <div
                  className={`bg-white pl-2 rounded-tr-2xl w-fit pr-8 py-2 firstLine`}
                >
                  <h2 className="truncate text-4xl text-primary-black font-medium">
                    {lines[0]}
                  </h2>
                </div>
              </div>

              <div
                className={`bg-white pl-2 rounded-tr-2xl pr-8 pt-2 pb-4 secondLine`}
              >
                <h2 className="truncate text-4xl text-primary-black font-medium">
                  {lines[1]}
                </h2>
              </div>
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
