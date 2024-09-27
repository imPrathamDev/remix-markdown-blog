import { MetaFunction } from "@remix-run/node";
import { json, useFetcher, useLoaderData } from "@remix-run/react";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import React from "react";
import Heading from "~/components/blog-article-components/Heading";

export const loader = async () => {
  const readme_url = `https://raw.githubusercontent.com/imPrathamDev/remix-markdown-blog/master/README.md`;
  const readme = await axios.get(readme_url);
  return json({ ok: true, readme: readme.data });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: "RMB | README.md" }];
};

function ReadMePage() {
  const data = useLoaderData<typeof loader>();
  return (
    <main className="container mx-auto px-4 lg:px-4">
      <div className="mx-auto max-w-7xl">
        <article className="prose max-w-none prose-headings:text-primary-black">
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
            {data.readme}
          </Markdown>
        </article>
      </div>
    </main>
  );
}

export default ReadMePage;
