import path from "path";
import fs from "fs";
import matter from "gray-matter";
import markdownToTxt from "markdown-to-txt";

const blogsDirectory = path.join(process.cwd(), "blogs");

export const getBlogs = async ({
  showContent = false,
}: {
  showContent?: boolean;
}) => {
  const fileNames = fs.readdirSync(blogsDirectory);
  const allBlogsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(blogsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      id,
      data: matterResult.data,
      ...(showContent && { content: matterResult.content }),
    };
  });

  return allBlogsData.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const getBlogBySlug = async ({ slug }: { slug: string }) => {
  try {
    const fileName = slug.trim() + ".md";
    const fullPath = path.join(blogsDirectory, fileName);
    const fileData = fs.readFileSync(fullPath, "utf8");
    const { content, data } = matter(fileData);
    return {
      content,
      data,
    };
  } catch (error) {
    console.log("getBlogBySlug() :: ERR ==> ", error);
    return undefined;
  }
};

export async function searchBlogs(q: string) {
  try {
    const blogs = await getBlogs({ showContent: true });
    let nq = q.trim().toLowerCase();
    const searched = blogs.filter(
      (f) =>
        f.data.title.toLowerCase().includes(nq) ||
        f.data.description.toLowerCase().includes(nq) ||
        f.data.author.toLowerCase().includes(nq)
    );
    return searched;
  } catch (error) {
    console.log("searchBlogs() :: ERR ==> ", error);
    return undefined;
  }
}
