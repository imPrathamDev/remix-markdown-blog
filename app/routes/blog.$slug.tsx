import { json, LoaderFunctionArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { getBlogBySlug } from "helpers/blogHelper";
import Markdown from "markdown-to-jsx";

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
    throw json("Not Found", { status: 404 });
  }
  throw json("Not Found", { status: 404 });
}

function BlogPage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="p-2">
      <h1 className="text-2xl my-1">{data.blog.data.title}</h1>
      <div className="prose">
        <Markdown>{data.blog.content}</Markdown>
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
