import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { getBlogBySlug } from "~/helpers/blogHelper";
import Markdown from "markdown-to-jsx";
import Heading from "~/components/blog-article-components/Heading";
import TagList from "~/components/blog-page/TagList";
import BlogThumbnailItem from "~/components/blog-page/BlogThumbnailItem";
import moment from "moment";
import ShareButton from "~/components/blog-page/ShareButton";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import EditButton from "~/components/blog-page/EditButton";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

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
  const container = useRef(null);
  const data = useLoaderData<typeof loader>();

  useGSAP(
    () => {
      gsap.from(".thumbnail", {
        scrollTrigger: {
          trigger: "#blog",
          start: "top 90%",
          end: "end",
          scrub: true,
        },
        scale: 1.5,
        ease: "none",
        // duration: 2,
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="container mx-auto px-4 lg:px-4">
      <div className="py-4">
        <h1
          style={{
            viewTransitionName: data.blog.data.slug + "-text",
          }}
          className="text-4xl lg:text-6xl font-semibold my-2"
        >
          {data.blog.data.title}
        </h1>
        <p className="text-base lg:text-lg font-light text-gray-500">
          {data.blog.data.description}
        </p>
        <div className="relative rounded-3xl overflow-hidden mt-4">
          <img
            src={data.blog.data.thumbnail}
            alt={data.blog.data.title + " By " + data.blog.data.author}
            className="w-full h-[65vh] object-cover thumbnail"
            style={{
              viewTransitionName: data.blog.data.slug,
            }}
          />
          <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-t from-primary-black/40 to-transparent flex flex-col lg:flex-row justify-end lg:items-end lg:justify-between gap-y-4 lg:gap-x-0 px-6 lg:px-14 pb-6">
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
      <div
        id="blog"
        className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-4 lg:gap-x-10"
      >
        <div className="col-span-1">
          <TagList content={data.blog.content} />
        </div>
        <div className="col-span-1 lg:col-span-3">
          <article className="prose max-w-none">
            <Markdown
              options={{
                overrides: {
                  h2: {
                    component: Heading,
                    props: {
                      headingType: "h2",
                    },
                  },
                  h3: {
                    component: Heading,
                    props: {
                      headingType: "h3",
                    },
                  },
                },
              }}
            >
              {data.blog.content}
            </Markdown>
          </article>
          <div className="my-4 flex items-center justify-end">
            <EditButton id={data.blog.data.slug + ".md"} />
          </div>
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
