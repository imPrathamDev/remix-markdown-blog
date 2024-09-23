import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { getBlogBySlug } from "~/helpers/blogHelper";
import Markdown from "markdown-to-jsx";
import H2 from "~/components/blog-article-components/H2";

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
  return (
    <div className="container mx-auto">
      <div className="mx-auto max-w-6xl flex">
        <div>Hello</div>
        <div>
          <h1 className="text-2xl my-1">{data.blog.data.title}</h1>
          <article className="prose">
            <Markdown
              options={{
                overrides: {
                  h2: {
                    component: H2,
                    // props: {
                    //   className: ""
                    // }
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
