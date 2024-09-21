import React, { useMemo } from "react";
import { divideLines } from "~/helpers/generalHelper";
import bg from "~/assets/background.jpg";
import moment from "moment";

function HeroGrid({
  blog,
}: {
  blog: {
    content?: string | undefined;
    id: string;
    data: {
      [key: string]: any;
    };
  };
}) {
  const lines = useMemo(() => {
    return divideLines(blog.data.title);
  }, [blog]);
  return (
    <div className="col-span-2 group row-span-2">
      <div className="hero-box-image h-[65vh] w-full bg-primary-pink rounded-t-3xl rounded-br-3xl  overflow-hidden relative">
        <img src={bg} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 w-12 h-12 rounded-full flex justify-center items-center bg-primary-white/0 backdrop-blur-sm text-primary-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 w-4/6 h-[10vh]">
          <div className="w-fit relative">
            <div className="flex flex-row items-center gap-x-2 text-xs text-primary-black pt-3 pb-2 px-2 bg-white rounded-tr-2xl test3">
              <span className="font-bold">
                Category .{" "}
                <span className="font-normal">{blog.data.categories[0]}</span>
              </span>

              <span className="text-primary-black">|</span>

              <span className="text-gray-400 font-light">
                {moment(blog.data.date).format("Do MMM")}
              </span>
            </div>
          </div>
          <div className="w-fit relative">
            <div
              className={`bg-white pl-2 rounded-tr-2xl w-fit pr-8 py-2 firstLine`}
            >
              <h2 className="truncate text-4xl text-primary-black font-medium">
                {lines[0]}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className={`bg-white pl-2 rounded-tr-2xl pr-8 pt-2 pb-4 secondLine`}>
        <h2 className="truncate text-4xl text-primary-black font-medium">
          {lines[1]}
        </h2>
      </div>
    </div>
  );
}

export default HeroGrid;
