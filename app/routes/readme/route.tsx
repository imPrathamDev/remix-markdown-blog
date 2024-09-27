import { MetaFunction } from "@remix-run/node";
import { json, useFetcher, useLoaderData } from "@remix-run/react";
import axios from "axios";
import React from "react";

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
  // console.log({ data });
  return <main className=""></main>;
}

export default ReadMePage;
