import React, { useMemo } from "react";
import { divideLines } from "~/helpers/generalHelper";

function TitleAnimation({ title }: { title: string }) {
  const [firstLine, secondLine] = useMemo(() => {
    return divideLines(title, 1);
  }, [title]);
  return (
    <h2 className="text-4xl font-bold">
      <div className="px-5 pt-3 bg-primary-white w-fit rounded-t-2xl relative ta-firstLine">
        <span>{firstLine}</span>
      </div>
      <div className="px-5 pb-3 pt-2 bg-primary-white w-fit rounded-b-2xl rounded-tr-2xl">
        <span className="">{secondLine}</span>
      </div>
    </h2>
  );
}

export default TitleAnimation;
