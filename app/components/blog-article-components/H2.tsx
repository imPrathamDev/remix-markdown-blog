import { MarkdownToJSX } from "markdown-to-jsx";
import React from "react";
import { createSlug } from "~/helpers/generalHelper";

function H2({ children, ...props }: MarkdownToJSX.HeadingNode) {
  return (
    <h2
      {...props}
      id={createSlug(children[0] as any)}
      className="px-2 py-1 rounded-md bg-primary-alt-green shadow-primary-green text-primary-black relative w-fit group hover:underline"
    >
      <span className="text-6xl absolute -top-6 -left-6 -z-10 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all ">
        #
      </span>
      {children as React.ReactNode}
    </h2>
  );
}

export default H2;
