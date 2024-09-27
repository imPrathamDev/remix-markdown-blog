import { useGSAP } from "@gsap/react";
import React, { useMemo, useRef } from "react";
import { divideLines } from "~/helpers/generalHelper";
import { gsap, Power2 } from "gsap";
gsap.registerPlugin(useGSAP);

function TitleAnimation({ title }: { title: string }) {
  const container = useRef();
  const [firstLine, secondLine] = useMemo(() => {
    return divideLines(title, 1);
  }, [title]);

  useGSAP(
    () => {
      if (container.current) {
        gsap.from(container.current, {
          y: 500,
          duration: 1.2,
          ease: Power2.easeInOut,
        });
      }
    },
    { scope: container }
  );

  return (
    <h2 ref={container as any} className="text-lg lg:text-4xl font-bold">
      <div className="px-2 lg:px-5 pt-2 lg:pt-3 bg-primary-white w-fit rounded-t-2xl relative ta-firstLine">
        <span className="title-text">{firstLine}</span>
      </div>
      <div className="px-2 lg:px-5 pb-2 lg:pb-3 pt-0 lg:pt-2 bg-primary-white w-fit rounded-b-2xl rounded-tr-2xl">
        <span className="title-text">{secondLine}</span>
      </div>
    </h2>
  );
}

export default TitleAnimation;
