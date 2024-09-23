import React, { useMemo } from "react";
import { createSlug, getH2HeadingsFromMD } from "~/helpers/generalHelper";

function TagList({ content }: { content?: string }) {
  const headings = useMemo(() => {
    let hs = getH2HeadingsFromMD(content ?? "");
    return hs.map((h) => ({
      heading: h,
      hash: createSlug(h),
    }));
  }, [content]);
  if (!content) {
    return null;
  }
  return (
    <ul>
      {headings.map((heading, index) => (
        <li key={heading.hash + index}>{heading.heading}</li>
      ))}
    </ul>
  );
}

export default TagList;
