import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";

type TextProps = SliceComponentProps<Content.TextSlice>;

const Text = ({ slice }: TextProps) => {
  return (
    <Bounded as="section" yPadding="sm" className="bg-white leading-relaxed">
      <div className="justify-center flex w-full items-center">
        <div
          className={clsx(
            " max-w-[860px] ",
            slice.variation === "twoColumns" && "md:columns-2 md:gap-6"
          )}
        >
          <PrismicRichText field={slice.primary.text} />
        </div>
      </div>
    </Bounded>
  );
};

export default Text;
