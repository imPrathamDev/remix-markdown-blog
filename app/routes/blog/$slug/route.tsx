import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { getBlogBySlug } from "~/helpers/blogHelper";
import Markdown from "markdown-to-jsx";
import H2 from "~/components/blog-article-components/H2";
import TagList from "~/components/blog-page/TagList";
import BlogThumbnailItem from "~/components/blog-page/BlogThumbnailItem";
import moment from "moment";
import ShareButton from "~/components/blog-page/ShareButton";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.slug) {
    const blog = await getBlogBySlug({
      slug: params.slug,
    });
    if (blog) {
      return json({
        blog,
      });
    }
    throw json("No Blog Found", { status: 404 });
  }
  throw json("No Blog Found", { status: 404 });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  let title = data?.blog.data.title + " By " + data?.blog.data.author;
  return [
    { title },
    {
      name: "description",
      content: data?.blog.data.description,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: data?.blog.data.description,
    },
    {
      property: "og:image",
      content: data?.blog.data.thumbnail,
    },
    {
      property: "og:type",
      content: "article",
    },
    {
      property: "author",
      content: data?.blog.data.author,
    },
    {
      property: "keywords",
      content: data?.blog.data.categories.join(", "),
    },
  ];
};

function BlogPage() {
  const data = useLoaderData<typeof loader>();

  useGSAP(() => {}, {});

  return (
    <div className="container mx-auto">
      <div className="py-4">
        <h1 className="text-6xl font-semibold my-2">{data.blog.data.title}</h1>
        <p className="text-lg font-light text-gray-500">
          {data.blog.data.description}
        </p>
        <div className="relative rounded-3xl overflow-hidden mt-4">
          <img
            src={data.blog.data.thumbnail}
            alt={data.blog.data.title + " By " + data.blog.data.author}
            className="w-full h-[65vh] object-cover"
          />
          <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-t from-primary-black/40 to-transparent flex items-end justify-between px-14 pb-6">
            <div className="flex items-center gap-x-8">
              <BlogThumbnailItem
                subtitle="Written By"
                title={data.blog.data.author}
              />
              <BlogThumbnailItem
                subtitle="Published On"
                title={moment(data.blog.data.date).format("Do MMM YYYY")}
              />
            </div>
            <ShareButton />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl grid grid-cols-4 gap-x-10">
        <div className="col-span-1">
          <TagList content={data.blog.content} />
        </div>
        <div className="col-span-3">
          <article className="prose max-w-none">
            <Markdown
              options={{
                overrides: {
                  h2: {
                    component: H2,
                  },
                },
              }}
            >
              {data.blog.content}
            </Markdown>
          </article>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export default BlogPage;
