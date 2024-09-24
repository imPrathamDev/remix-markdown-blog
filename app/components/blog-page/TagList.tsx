import React, { useCallback, useMemo } from "react";
import {
  createSlug,
  getH2HeadingsFromMD,
  getHeadingsFromMD,
} from "~/helpers/generalHelper";
import TagItem from "./TagItem";

function TagList({ content }: { content?: string }) {
  const headings = useMemo(() => {
    let hs = getHeadingsFromMD(content ?? "");
    // return hs.map((h) => ({
    //   heading: h,
    //   hash: createSlug(h),
    // }));
    return hs;
  }, [content]);

  // const navigate = useNavigate();

  if (!content || headings.length <= 0) {
    return null;
  }

  return (
    <div className="py-2">
      <h3 className="text-base font-semibold my-2">On this page</h3>
      <ul className="">
        {headings.map((heading, index) => (
          <TagItem key={heading.text + index} item={heading} isNested={false} />
        ))}
      </ul>
    </div>
  );
}

export default TagList;
