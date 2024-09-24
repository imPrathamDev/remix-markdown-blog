import React from "react";

function BlogThumbnailItem({
  subtitle,
  title,
}: {
  subtitle: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-y-2 text-primary-white">
      <span className="text-xs font-light">{subtitle}</span>
      <p className="text-base">{title}</p>
    </div>
  );
}

export default BlogThumbnailItem;
