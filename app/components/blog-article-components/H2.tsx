import { MarkdownToJSX } from "markdown-to-jsx";
import React from "react";
import { createSlug } from "~/helpers/generalHelper";

function H2({ children, ...props }: MarkdownToJSX.HeadingNode) {
  return (
    <h2 {...props} id={createSlug(children[0] as any)}>
      {children as React.ReactNode}
    </h2>
  );
}

export default H2;
