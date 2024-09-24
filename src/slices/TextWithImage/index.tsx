import { type Content, isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import ButtonLink from "@/components/ButtonLink";

type TextWithImageProps = SliceComponentProps<Content.TextWithImageSlice>;

const TextWithImage = ({ slice }: TextWithImageProps) => {
  const image = slice.primary.image;

  return (
    <Bounded as="section" yPadding="sm" className="bg-white">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div>
          <PrismicRichText
            components={{
              paragraph: ({ children }) => (
                <p className="mb-7 last:mb-0 text-dark-primary/80 text-b18 text-balance">
                  {children}
                </p>
              ),
            }}
            field={slice.primary.text}
          />
          {slice.variation === "withButton" && slice.primary.buttonLink ? (
            <ButtonLink
              field={slice.primary.buttonLink}
              className="font-semibold"
            >
              {slice.primary.buttonText || "Learn more"}
            </ButtonLink>
          ) : null}
        </div>
        <div>
          {isFilled.image(image) && (
            <div className="bg-white rounded-2xl">
              <PrismicNextImage
                field={image}
                width={750}
                height={620}
                className="w-full rounded-2xl lg:max-h-[620px] max-h-[320px] object-cover object-center max-w-full"
              />
            </div>
          )}
        </div>
      </div>
    </Bounded>
  );
};

export default TextWithImage;
